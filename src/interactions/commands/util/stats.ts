import {TickerType} from '@prisma/client';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {humanize} from '../../../harvesters/harvester';
import {redis} from '../../../server/redis';
import {getStats} from '../../../server/stats';
import {tickerTypeNames} from '../../types/type-names';

const codeblock = (text: string) => `\`\`\`${text}\`\`\``;
export class StatsCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'stats',
			description: 'Gets information about StreamTicker.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();
		const tickerStats = await getStats();
		const clientStats = await redis.get<{users: number; guilds: number}>('stats:client');
		await ctx.send({
			embeds: [
				{
					title: 'StreamTicker Stats',
					fields: [
						{
							name: 'Discord Stats',
							value: `<:icons_Person:859388129932214292>   ${
								clientStats?.users ? humanize(clientStats.users) : 0
							} users \n<:icons_people:964425853930995783>   ${
								clientStats?.guilds ? humanize(clientStats.guilds) : 0
							} guilds`,
							inline: true,
						},
						{
							name: 'Tickers',
							value:
								`${humanize(tickerStats.total_tickers)} tickers total\n\`\`\`` +
								Object.entries(tickerStats.tickers)
									.sort(([, a], [, b]) => b - a)
									.map(
										ticker =>
											`• ${humanize(ticker[1])} ${tickerTypeNames[ticker[0] as TickerType].replace(
												' (input required)',
												''
											)}`
									)
									.join('\n') +
								'```',
						},
					],
				},
			],
		});
	}
}
