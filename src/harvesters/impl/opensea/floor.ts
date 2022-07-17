import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {OpenSeaAPI} from './api';

export const OPENSEA_COLLECTION_FLOOR = createHarvester(TickerType.OPENSEA_COLLECTION_FLOOR, {
	requirement: TickerRequirement.VOTE,
	validateInput: async collection => {
		if (!collection) {
			return {
				success: false,
				message: 'Invalid format! Expected `collection-name`',
			};
		}

		const body = await OpenSeaAPI.getCollectionStats(collection).catch(() => null);

		if (!body) {
			throw new Error('Collection not found.');
		}

		return {
			success: true,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const openseaCollection = await OpenSeaAPI.getCollectionStats(ticker.platform_id);

		return openseaCollection.stats.floor_price.toPrecision(2);
	},
});