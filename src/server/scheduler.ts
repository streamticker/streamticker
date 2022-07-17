import axios from 'axios';
import {api} from './api';
import {env} from './env';
import {harvesters} from '../harvesters';
import {prisma} from './prisma';
import dayjs from 'dayjs';
import {logsnag} from './logsnag';

export const handler = api({
	async POST({ctx}) {
		const tickers = await ctx.prisma.ticker.findMany({
			take: 50,
			where: {
				refresh_after: {
					lt: new Date(),
				},
			},
			orderBy: {
				refresh_after: 'desc',
			},
		});

		const stats = {
			deleted: 0,
			updated: 0,
			fails: 0,
		};

		for (const ticker of tickers) {
			const harvester = harvesters[ticker.type];

			try {
				const result = await harvester.harvest(ticker);

				if (!result.success) {
					await prisma.ticker.delete({
						where: {channel_id: ticker.channel_id},
					});

					await logsnag.publish({
						channel: 'errors',
						event: "Couldn't refresh ticker",
						icon: '⚠️',
						description: `Was unable to refresh ${ticker.channel_id}`,
						tags: {
							code: result.code,
							ticker: ticker.channel_id,
							ticker_last_updated: ticker.last_updated?.getTime() ?? 'n/a',
						},
						notify: true,
					});

					stats.deleted++;
				} else {
					await prisma.ticker.update({
						where: {channel_id: ticker.channel_id},
						data: {
							refresh_after: dayjs().add(1, 'hour').toDate(),
						},
					});

					stats.updated++;
				}
			} catch (e) {
				await logsnag.publish({
					channel: 'errors',
					event: 'Ticker update failed',
					icon: '🚨',
					description: JSON.stringify(e),
					tags: {
						ticker: ticker.channel_id,
						ticker_last_updated: ticker.last_updated?.getTime() ?? 'n/a',
					},
					notify: true,
				});

				stats.fails++;
			}
		}

		await logsnag.publish({
			channel: 'refreshes',
			event: 'Refreshed tickers',
			icon: '🔁',
			description: `Refreshed ${tickers.length} tickers\nDeleted ${stats.deleted} tickers\nUpdated ${stats.updated} tickers\Failed to update ${stats.fails} tickers`,
			tags: {
				count: tickers.length,
			},
		});
	},
});

/**
 * Enqueue a job to lowcake asking for an empty POST back
 *
 * @param url The URL to receive a request at for cron intervals
 * @param cron The cron to use for the interval. Defaults to "At every fifth minute"
 * @param queue The queue ID to use. Defaults to the one configured from environment
 */
export async function enqueue(url: string, cron = '*/5 * * * *', queue = env.LOWCAKE_QUEUE_ID) {
	const {data} = await axios.post(
		`https://lowcake-api.otters.app/v1/queues/${queue}`,
		{
			url,
			payload: null,
			exclusive: false,
			override: true,
			retry: [],
			schedule: {
				type: 'cron',
				meta: cron,
			},
		},
		{
			headers: {Authorization: `Bearer ${env.LOWCAKE_API_KEY}`},
		}
	);

	return data;
}

export async function dequeue(queue: string, job: string) {
	const {data} = await axios.delete(
		`https://lowcake-api.otters.app/v1/queues/${queue}/jobs/${job}`,
		{headers: {Authorization: `Bearer ${env.LOWCAKE_API_KEY}`}}
	);

	return data;
}
