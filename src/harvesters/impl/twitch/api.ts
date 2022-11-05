import axios from 'axios';
import {env} from '../../../server/env';
import {wrapRedis} from '../../../server/redis';
const SIXTY_DAYS_IN_SECONDS = 5184000;

export const TwitchAPI = {
	async getBearer(): Promise<string> {
		return wrapRedis(
			`twitch:bearer`,
			async () => {
				const {data} = await axios.post<{access_token: string}>(
					`https://id.twitch.tv/oauth2/token?client_id=${env.TWITCH_CLIENT_ID}&client_secret=${env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
				);

				return data.access_token;
			},
			SIXTY_DAYS_IN_SECONDS
		);
	},

	async getHeaders() {
		const access = await TwitchAPI.getBearer();

		return {
			Authorization: `Bearer ${access}`,
			'Client-Id': env.TWITCH_CLIENT_ID,
		};
	},

	async getUser(query: string, type: 'login' | 'id' = 'login') {
		const {data} = await axios.get<{
			data: Array<{
				id: string;
				login: string;
				display_name: string;
				type: string;
				broadcaster_type: string;
				description: string;
				profile_image_url: string;
				offline_image_url: string;
				view_count: number;
				email: string;
				created_at: string;
			}>;
		}>(`https://api.twitch.tv/helix/users?${type}=${query}`, {
			headers: await TwitchAPI.getHeaders(),
		});

		const user = data.data[0];

		if (!user) {
			throw new Error('User does not exist');
		}

		return user;
	},

	async getFollows(id: string) {
		const {data} = await axios.get<{total: number}>(
			`https://api.twitch.tv/helix/users/follows?to_id=${id}`,
			{headers: await TwitchAPI.getHeaders()}
		);

		return data;
	},

	async getStreams(id: string) {
		const {data} = await axios.get<{data: Array<{viewer_count: number} | null>}>(
			`https://api.twitch.tv/helix/streams?user_id=${id}`,
			{headers: await TwitchAPI.getHeaders()}
		);

		return data.data[0];
	},
};
