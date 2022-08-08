import axios from 'axios';
import urlcat from 'urlcat';
import {env} from '../../../server/env';

export const YouTubeAPI = {
	async getUser(id: string) {
		const {data} = await axios.get<{
			success: boolean;
			subscribers: number;
			views: number;
			videos: number;
		}>(`https://wadokei.hop.sh/youtube/${id}`, {
			headers: {Authorization: env.WADOKEI_KEY},
		});

		if (!data.success) {
			throw new Error('YouTube channel not found. Check your YouTube URL and try again.');
		}

		return {
			id,
			subscribers: data.subscribers,
			viewCount: data.views,
		};
	},
};
