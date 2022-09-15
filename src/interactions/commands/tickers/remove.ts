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
import {FORMATTER_REPLACER} from '../../../harvesters/harvester';
import {logsnag} from '../../../server/logsnag';
import {prisma} from '../../../server/prisma';
import {defaultTickerFormats, tickerTypeNames} from '../../types/type-names';
import {is, enumerate} from '../../util';

export class RemoveCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'remove',
			description: 'Remove a ticker.',
			options: [
				{
					name: 'channel',
					description: 'The ticker to remove.',
					required: true,
					type: CommandOptionType.CHANNEL,
					channel_types: [ChannelType.GUILD_VOICE],
				},
			],
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();

		const found = await prisma.ticker.findFirst({
			where: {
				channel_id: ctx.options.channel as string,
			},
		});

		if (!found) {
			throw new Error('This channel is not a valid ticker!');
		}

		await prisma.ticker.delete({
			where: {
				channel_id: ctx.options.channel as string,
			},
		});

		await ctx.send({
			embeds: [
				{
					description: `<:icons_busy:860123643219410965> Successfully deleted your ticker from being updated.`,
					color: 0xed4245,
				},
			],
		});

		await logsnag({
			channel: 'tickers',
			event: 'User deleted ticker',
			icon: '🚮',
			description: `${ctx.user.username}#${ctx.user.discriminator} deleted a ticker`,
			tags: {
				ticker: ctx.options.type as TickerType,
				guild: ctx.guildID!,
				channel: ctx.options.channel as string,
				user: ctx.user.id,
			},
			notify: true,
		});
	}
}
