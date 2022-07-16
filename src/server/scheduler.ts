import axios from 'axios';
import {api} from './api';

interface TickerQueue {
	//
}

export const handler = api({
	async GET({req, res}) {
		console.log('Scheduler request');
	},

	async POST({req}) {
		console.log('Received data from lowcake:', Date.now(), req.body);
	},
});

export async function enqueue() {
	await axios.post('https://lowcake-api.otters.app/v1/queues', {
		//
	});
}
