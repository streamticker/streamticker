// TODO: Eventually rewrite this command
// I don't like the look of it and it should use a dropdown or something. just having a huge list is ugly as fuck

import {TickerType} from '@prisma/client';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {getStats} from '../../../server/stats';
import {
	tickerCategoryTitles,
	tickerDescriptions,
	tickerSort,
	tickerTypeNames,
} from '../../types/type-names';

export class TickersListCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'tickers',
			description: 'Prints available tickers and their descriptions.',
		});
	}

	async run(ctx: CommandContext) {
		const tickerStats = await getStats();
		await ctx.send({
			embeds: [
				{
					title: `${Object.keys(tickerTypeNames).length} ticker types available on StreamTicker`,
					fields: Object.entries(tickerSort).map(entry => {
						const [titleIndex, tickers] = entry as [string, TickerType[]];
						const title = tickerCategoryTitles[titleIndex as keyof typeof tickerCategoryTitles];
						return {
							name: title,
							value: tickers
								.map(
									ticker =>
										`- ${tickerStats.tickers[ticker] || 0} ${tickerTypeNames[ticker].replace(
											' (input required)',
											''
										)}`
								)
								.join('\n'),
						};
					}),
				},
			],
		});
	}
}
