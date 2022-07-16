import axios from 'axios';
import {env} from '../../../server/env';

const headers = {
	authorization: `Bearer ${env.TWITTER_AUTH}`,
};

export const TwitterAPI = {
	async screenNameToId(screenName: string) {
		return axios
			.get<{id_str: string}>(
				`https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}`,
				{headers}
			)
			.then(response => response.data.id_str);
	},

	async user(id: string) {
		const {data} = await axios.get<
			{screen_name: string; followers_count: number; id_str: string} | {errors: unknown}
		>(`https://api.twitter.com/1.1/users/show.json?id=${id}`, {
			headers,
		});

		if ('errors' in data) {
			throw new Error('Twitter user not found. Check your username and try again.');
		}

		return data;
	},
};
