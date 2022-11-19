import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {TikTokAPI} from './api';

export const TIKTOK_LIKE_COUNT = createHarvester(TickerType.TIKTOK_LIKE_COUNT, {
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
			return {
				success: false,
				message:
					"TikTok user was not found - this could be a mistake, try the command again. If it still doesn't work, please reach out to the developers with `/support` and let them know.",
			};
		}

		if (!body.stats?.heartCount) {
			return {
				success: false,
				message:
					'Your TikTok profile was found, however StreamTicker could not find your like count. Please reach out to the developers with `/support` and let them know.',
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
