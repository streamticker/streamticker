import {SlashCommand, SlashCreator, CommandContext, ComponentType} from 'slash-create';
import {prisma} from '../../../server/prisma';
import {tickerTypeNames} from '../../types/type-names';

export class ListCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'list',
			description: 'List all tickers in a guild.',
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();
		const tickers = await prisma.ticker.findMany({
			where: {
				guild_id: ctx.guildID,
			},
		});

		if (!tickers.length) {
			await ctx.send({
				embeds: [
					{
						description: `<:icons_busy:860123643219410965> No tickers found! Create some with \`/create\!`,
						color: 0xed4245,
					},
				],
			});
			return;
		}

		const tickerList = tickers
			.map(ticker => {
				const template = `<#${ticker.channel_id}>: \`${ticker.channel_id}\``;

				if (ticker.platform_id) {
					return `${template} (${ticker.platform_id})`;
				}

				return template;
			})
			.join('\n');

		await ctx.send({
			embeds: [
				{
					description: 'Select a ticker below to learn more information!',
					title: 'Ticker List',
					color: 0x85ed91,
				},
			],
			components: [
				{
					type: ComponentType.ACTION_ROW,
					components: [
						{
							type: ComponentType.SELECT,
							custom_id: 'ticker_select',
							placeholder: 'Choose a ticker for more information!',
							options: tickers.map(ticker => ({
								label: tickerTypeNames[ticker.type].replace('(input required) ', ''),
								description: `ID: ${ticker.channel_id}`,
								value: ticker.channel_id,
								emoji: {
									name: 'icons_channel',
									id: `859424401950113822`,
								},
							})),
						},
					],
				},
			],
		});

		/**
		 * This function handles component contexts within a command, so you
		 * can use the previous context aswell.
		 */
		ctx.registerComponent('ticker_select', async selectCtx => {
			const ticker = tickers.find(ticker => ticker.channel_id === selectCtx.values[0]);

			if (!ticker) {
				return;
			}

			await selectCtx.editOriginal({
				embeds: [
					{
						title: `Information on ${tickerTypeNames[ticker.type].replace(
							'(input required) ',
							''
						)} ticker`,
						description: `<:icons_id:860133546102620190> <#${ticker.channel_id}> (\`${
							ticker.channel_id
						}\`)\n\n<:icons_edit:859388129625374720> Format: \`${
							ticker.format
						}\`\n\n<:icons_clock:964491800465276940> Last updated <t:${Math.floor(
							new Date(ticker.last_updated).getTime() / 1000
						)}:R>\n<:icons_reminder:859388128364199946> Refresh due <t:${Math.floor(
							new Date(ticker.refresh_after).getTime() / 1000
						)}:R>`,
						color: 0x85ed91,
					},
				],
			});
		});
	}
}
