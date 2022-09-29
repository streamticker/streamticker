import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {OpenSeaAPI} from './api';

export const OPENSEA_COLLECTION_VOLUME = createHarvester(TickerType.OPENSEA_COLLECTION_VOLUME, {
	requirement: TickerRequirement.VOTE,
	async validateInput(collection) {
		if (!collection) {
			return {
				success: false,
				message: 'Invalid format! Expected `collection-name`',
			};
		}

		const body = await OpenSeaAPI.getCollectionStats(collection).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'Collection not found',
			};
		}

		return {
			success: true,
			platform_id: collection,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const openseaCollection = await OpenSeaAPI.getCollectionStats(ticker.platform_id);

		return Math.round(openseaCollection.stats.total_volume);
	},
});
