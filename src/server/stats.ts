import {DiscordAPI} from '../harvesters/impl/discord/api';
import {prisma} from './prisma';
import {wrapRedis} from './redis';

export async function getStats() {
	return wrapRedis(
		'stats',
		async () => ({
			tickers: await prisma.ticker.count(),
			guilds: await DiscordAPI.getBotGuilds().then(guilds => guilds.length),
		}),
		60 * 60
	);
}
