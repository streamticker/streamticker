import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {RobloxAPI} from './api';

export const ROBLOX_FOLLOWERS = createHarvester(TickerType.ROBLOX_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await RobloxAPI.getUserIdByUsername(username).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'Roblox user does not exist',
			};
		}

		return {
			success: true,
			platform_id: body.toString(),
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const followerCount = await RobloxAPI.getUserFollows(ticker.platform_id);

		return followerCount;
	},
});
