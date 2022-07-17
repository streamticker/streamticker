import {TickerType} from '@prisma/client';
import {
	SlashCommand,
	SlashCreator,
	CommandContext,
	CommandOptionType,
	ChannelType,
	ApplicationCommandOptionChoice,
} from 'slash-create';
import {harvesters} from '../../../harvesters';
import {logsnag} from '../../../server/logsnag';
import {prisma} from '../../../server/prisma';
import {defaultTickerFormats, tickerTypeNames} from '../../types/type-names';
import {is, enumerate} from '../../util';

export class RefreshCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'refresh',
			description: 'Refresh a ticker.',
			options: [
				{
					name: 'channel',
					description: 'The ticker to refresh.',
					required: true,
					type: CommandOptionType.CHANNEL,
					channel_types: [ChannelType.GUILD_VOICE],
				},
			],
			throttling: {
				usages: 1,
				duration: 3600,
			},
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		ctx.defer();

		const ticker = await prisma.ticker.findFirst({
			where: {channel_id: ctx.options.channel},
		});

		if (!ticker || ticker.guild_id !== ctx.guildID) {
			await ctx.send('Ticker not found.');
			return;
		}

		const harvester = harvesters[ticker.type];

		const result = await harvester.harvest(ticker);

		if (!result.success) return ctx.send(result.code);

		await prisma.ticker.update({
			where: {
				channel_id: ctx.options.channel,
			},
			data: {
				refresh_after: new Date(),
			},
		});

		return ctx.send('Ticker refreshed.');
	}
}
