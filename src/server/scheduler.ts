import axios from 'axios';
import {api} from './api';
import {env} from './env';

export const handler = api({
	async POST({req}) {
		console.log('Received data from lowcake:', Date.now(), req.body);
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
