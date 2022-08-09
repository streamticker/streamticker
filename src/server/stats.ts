import {TickerType} from '@prisma/client';
import {insight} from './logsnag';
import {prisma} from './prisma';
import {wrapRedis} from './redis';

export async function getStats() {
	return wrapRedis(
		'stats',
		async () => {
			const tickers = await prisma.$queryRaw<
				Array<{type: TickerType; count: number}>
			>`SELECT type, count(*)::INTEGER FROM "public"."Ticker" GROUP BY type;`;

			const entries = tickers.map(
				ticker => [ticker.type, ticker.count] as [type: TickerType, count: number]
			);

			const total_tickers = await prisma.ticker.count();

			await insight({
				icon: '#️⃣',
				title: 'Total Tickers',
				value: total_tickers,
			});

			return {
				total_tickers,
				tickers: Object.fromEntries(entries) as Record<TickerType, number>,
			};
		},
		60 * 60
	);
}
