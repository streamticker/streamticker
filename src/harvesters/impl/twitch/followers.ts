import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {TwitchAPI} from './api';

export const TWITCH_FOLLOWERS = createHarvester(TickerType.TWITCH_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	validateInput: async username => {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await TwitchAPI.getUser(username, 'login').catch(() => null);

		if (!body) {
			throw new Error('Twitch user does not exist');
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
