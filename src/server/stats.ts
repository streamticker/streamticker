import {TickerType} from '@prisma/client';
import {DiscordAPI} from '../harvesters/impl/discord/api';
import {prisma} from './prisma';
import {wrapRedis} from './redis';

export async function getStats() {
	return wrapRedis(
		'stats',
		async () => {
			const tickers = await prisma.$queryRaw<
				Array<{type: TickerType; count: number}>
			>`SELECT type, count(*)::INTEGER FROM "public"."Ticker" GROUP BY type;`;

			const entries = tickers.map(ticker => [ticker.type, ticker.count]);

			return {
				total_tickers: await prisma.ticker.count(),
				tickers: Object.fromEntries(entries) as Record<TickerType, number>,
				guilds: await DiscordAPI.getBotGuilds().then(guilds => guilds.length),
			};
		},
		60 * 60
	);
}
