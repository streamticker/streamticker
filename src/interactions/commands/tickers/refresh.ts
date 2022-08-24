import {TickerType} from '@prisma/client';
import dayjs from 'dayjs';
import {
	SlashCommand,
	SlashCreator,
	CommandContext,
	CommandOptionType,
	ChannelType,
} from 'slash-create';
import {harvesters} from '../../../harvesters';
import {prisma} from '../../../server/prisma';

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
			requiredPermissions: ['MANAGE_CHANNELS'],
			throttling: {
				usages: 2,
				duration: 10 * 60,
			},
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();

		const ticker = await prisma.ticker.findFirst({
			where: {channel_id: ctx.options.channel as string},
		});

		if (!ticker || ticker.guild_id !== ctx.guildID) {
			await ctx.send({
				embeds: [
					{
						description: `<:icons_Wrong:859388130636988436> Ticker not found!`,
						color: 0xed4245,
					},
				],
			});
			return;
		}

		const harvester = harvesters[ticker.type];
		const result = await harvester.harvest(ticker);

		if (!result.success) {
			await ctx.send({
				embeds: [
					{
						description: `<:icons_Wrong:859388130636988436> There was an error! Please do \`/support\` and tell the developers this code: \`${result.code}\``,
						color: 0xed4245,
					},
				],
			});
			return;
		}

		await prisma.ticker.update({
			where: {
				channel_id: ctx.options.channel as string,
			},
			data: {
				refresh_after: dayjs().add(1, 'hour').toDate(),
			},
		});
		await ctx.send({
			embeds: [
				{
					description: `<:icons_update:860123644297871382> Successfully refreshed your ticker with the latest information!`,
					color: 0x85ed91,
					footer: {
						text: `If your ticker didn't update, either we didn't find new data, or the bot can't update the channel!`,
					},
				},
			],
		});
	}
}
