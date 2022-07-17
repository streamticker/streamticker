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

export class FormatCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'format',
			description: 'Format an existing ticker.',
			options: [
				{
					name: 'channel',
					description: 'The ticker to format.',
					required: true,
					type: CommandOptionType.CHANNEL,
					channel_types: [ChannelType.GUILD_VOICE],
				},
				{
					name: 'input',
					description: `The channel to edit a format of. Use "${FORMATTER_REPLACER}" where you would like the value to appear.`,
					required: false,
					type: CommandOptionType.STRING,
				},
			],
		});
	}

	async run(ctx: CommandContext) {
		ctx.defer();

		if (!ctx.guildID) {
			throw new Error('This command can only be ran inside of a guild!');
		}

		if (!is(ctx.options.type, enumerate(TickerType))) {
			throw new Error('Invalid ticker type!');
		}

		const existingOnChannel = await prisma.ticker.findFirst({
			where: {channel_id: ctx.options.channel},
		});

		if (existingOnChannel) {
			throw new Error('A ticker already exists on this channel!');
		}

		const harvester = harvesters[ctx.options.type];

		let platformId: string | null = null;

		if (harvester.validateInput) {
			const result = await harvester.validateInput(ctx.options.input);

			if (result.success) {
				platformId = result.platform_id;
			} else {
				throw new Error(result.message);
			}
		}

		const ticker = await prisma.ticker.create({
			data: {
				channel_id: ctx.options.channel,
				guild_id: ctx.guildID,
				type: ctx.options.type,
				refresh_after: new Date(),
				format: defaultTickerFormats[ctx.options.type], // TODO: get format from harvester
				platform_id: platformId,
			},
		});

		await harvester.harvest(ticker);

		ctx.send('Ticker created (add more data here)');

		await logsnag.publish({
			channel: 'tickers',
			event: 'User created ticker',
			icon: '🆕',
			description: `${ctx.user.username}#${ctx.user.discriminator} created a ticker at ${
				ctx.guildID
			} ${ctx.options.input ? `with input ${ctx.options.input}` : ''}`,
			tags: {
				ticker: ctx.options.type,
				channel: ctx.options.channel,
				user: ctx.user.id,
			},
			notify: true,
		});
	}
}
