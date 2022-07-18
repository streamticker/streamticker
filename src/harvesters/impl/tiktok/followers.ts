import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {TikTokAPI} from './api';

export const TIKTOK_FOLLOWERS = createHarvester(TickerType.TIKTOK_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await TikTokAPI.getUser(username).catch(() => null);

		if (!body) {
			throw new Error('TikTok user does not exist');
		}

		return {
			success: true,
			platform_id: body.uniqueId,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const total = await TikTokAPI.getUserFollows(ticker.platform_id);

		return total;
	},
});
