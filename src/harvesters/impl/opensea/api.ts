import axios from 'axios';
import {env} from '../../../server/env';
import type {OpenSeaCollectionStats} from '../../types/opensea';

export const OpenSeaAPI = {
	async getCollectionStats(collection: string) {
		const {data} = await axios.get<{stats: OpenSeaCollectionStats}>(
			`https://api.opensea.io/api/v1/collection/${collection}/stats`,
			{
				headers: {
					'X-API-KEY': env.OPENSEA_API_KEY,
				},
			}
		);

		return data;
	},
};
