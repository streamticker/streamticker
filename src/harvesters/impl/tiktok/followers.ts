import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {TikTokAPI} from './api';

export const TIKTOK_FOLLOWERS = createHarvester(TickerType.TIKTOK_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Input missing! Expected `username`',
			};
		}

		const body = await TikTokAPI.getUser(username).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'TikTok user does not exist',
			};
		}

		if (!body.stats?.followerCount) {
			return {
				success: false,
				message:
					'Your TikTok profile was found, however StreamTicker could not find your follower count. Please reach out to the developers with `/support` and let them know.',
			};
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
