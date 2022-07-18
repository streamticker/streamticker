import axios from 'axios';
import {TikTokUser} from './types';

export const TikTokAPI = {
	async getUser(username: string) {
		const {data} = await axios.get<TikTokUser>(`https://wadokei.hop.sh/${username}`);

		return data.userInfo;
	},

	async getUserFollows(username: string) {
		const {data} = await axios.get<TikTokUser>(`https://wadokei.hop.sh/${username}`);

		return data.userInfo.stats.followerCount;
	},
};
