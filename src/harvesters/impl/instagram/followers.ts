import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {InstagramAPI} from './api';

export const INSTAGRAM_FOLLOWERS = createHarvester(TickerType.INSTAGRAM_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await InstagramAPI.getUser(username).catch(() => null);

		if (!body) {
			throw new Error('TikTok user does not exist');
		}

		return {
			success: true,
			platform_id: username,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const total = await InstagramAPI.getUserFollows(ticker.platform_id);

		return total;
	},
});
