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
					name: 'format',
					description: `The channel to edit a format of. Use "${FORMATTER_REPLACER}" where you would like the value to appear.`,
					required: false,
					type: CommandOptionType.STRING,
				},
			],
		});
	}

	async run(ctx: CommandContext) {
		ctx.defer(true);

		if (!ctx.options.format.includes(FORMATTER_REPLACER)) {
			throw new Error(`Format must contain ${FORMATTER_REPLACER} to place a value into.`);
		}

		const found = await prisma.ticker.findFirst({
			where: {
				channel_id: ctx.options.channel,
			},
		});

		if (!found) {
			throw new Error('This channel is not a valid ticker!');
		}

		await prisma.ticker.update({
			where: {
				channel_id: ctx.options.channel,
			},
			data: {
				format: ctx.options.format,
			},
		});

		ctx.send(`Format updated to ${ctx.options.format}.`);
	}
}
