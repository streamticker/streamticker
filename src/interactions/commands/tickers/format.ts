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
					required: true,
					type: CommandOptionType.STRING,
				},
			],
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer(true);

		if (!(ctx.options.format as string).includes(FORMATTER_REPLACER)) {
			throw new Error(`Format must contain ${FORMATTER_REPLACER} to place a value into.`);
		}

		const found = await prisma.ticker.findFirst({
			where: {
				channel_id: ctx.options.channel as string,
			},
		});

		if (!found) {
			throw new Error('This channel is not a valid ticker!');
		}

		await prisma.ticker.update({
			where: {
				channel_id: ctx.options.channel as string,
			},
			data: {
				format: ctx.options.format as string,
				refresh_after: new Date(),
			},
		});

		await ctx.send({
			embeds: [
				{
					description: `<:icons_edit:859388129625374720> Successfully edited your ticker with format \`<#${
						ctx.options.format as string
					}>\`!`,
					color: 0x85ed91,
					footer: {
						text: `Refresh the ticker using /refresh to see your changes!`,
					},
				},
			],
		});
	}
}
