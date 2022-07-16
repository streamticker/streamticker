import axios from 'axios';
import urlcat from 'urlcat';
import {env} from '../../../server/env';

export const YouTubeAPI = {
	async getUser(id: string) {
		const url = urlcat('https://www.googleapis.com/youtube/v3/channels', {
			part: 'statistics,brandingSettings',
			id,
			fields: 'items(brandingSettings/channel/title,statistics/subscriberCount)',
			key: env.YOUTUBE_SECRET,
		});

		const {data, status} = await axios.get<{
			items?: Array<{
				statistics: {
					subscriberCount: number;
					viewCount: number;
				};
				brandingSettings: {
					channel: {
						title: string;
					};
				};
			}>;
		}>(url);

		if (status >= 400 || !data.items || !data.items[0]) {
			throw new Error('YouTube channel not found. Check your YouTube URL and try again.');
		}

		return {
			id,
			subscribers: data.items[0].statistics.subscriberCount,
			name: data.items[0].brandingSettings.channel.title,
			viewCount: data.items[0].statistics.viewCount,
		};
	},
};
