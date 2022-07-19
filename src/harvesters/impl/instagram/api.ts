import axios from 'axios';
import {env} from '../../../server/env';
import {InstagramUser} from './types';

export const InstagramAPI = {
	async getUser(username: string) {
		const {data} = await axios.get<InstagramUser>(`https://wadokei.hop.sh/instagram/${username}`, {
			headers: {Authorization: env.WADOKEI_KEY},
		});

		return data;
	},

	async getUserFollows(username: string) {
		const {data} = await axios.get<InstagramUser>(`https://wadokei.hop.sh/instagram/${username}`, {
			headers: {Authorization: env.WADOKEI_KEY},
		});

		return data.data.user.edge_followed_by.count;
	},
};
