import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {TwitchAPI} from './api';

export const TWITCH_FOLLOWERS = createHarvester(TickerType.TWITCH_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await TwitchAPI.getUser(username, 'login').catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'Twitch user does not exist',
			};
		}

		return {
			success: true,
			platform_id: body.id,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const {total} = await TwitchAPI.getFollows(ticker.platform_id);

		return total;
	},
});
