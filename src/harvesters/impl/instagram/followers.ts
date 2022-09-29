import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {InstagramAPI} from './api';

export const INSTAGRAM_FOLLOWERS = createHarvester(TickerType.INSTAGRAM_FOLLOWERS, {
	disabled: {
		disabled: true,
		reason:
			"StreamTicker's Instagram data source is currently unavailable. For more information, [join StreamTicker's support server](https://streamticker.bot/support).",
	},
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
			return {
				success: false,
				message: 'Instagram user not found',
			};
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
