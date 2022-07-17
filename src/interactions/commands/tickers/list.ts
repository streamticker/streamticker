import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {prisma} from '../../../server/prisma';

export class ListCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'list',
			description: 'List all tickers in a guild.',
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		const tickers = await prisma.ticker.findMany({
			where: {
				guild_id: ctx.guildID,
			},
		});

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
					description: tickerList,
					title: 'Ticker List',
				},
			],
		});
	}
}
