import axios from 'axios';
import {env} from '../../../server/env';
import {TikTokUser} from './types';

export const TikTokAPI = {
	async getUser(username: string) {
		const {data} = await axios.get<TikTokUser>(`https://wadokei.hop.sh/tiktok/${username}`, {
			headers: {Authorization: env.WADOKEI_KEY},
		});

		return data.userInfo;
	},

	async getUserFollows(username: string) {
		const {data} = await axios.get<TikTokUser>(`https://wadokei.hop.sh/tiktok/${username}`, {
			headers: {Authorization: env.WADOKEI_KEY},
		});

		return data.userInfo.stats.followerCount;
	},
};
