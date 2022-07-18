import {TickerType} from '@prisma/client';
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

			return {
				total_tickers: await prisma.ticker.count(),
				tickers: Object.fromEntries(entries) as Record<TickerType, number>,
			};
		},
		60 * 60
	);
}
