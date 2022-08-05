import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {TwitterAPI} from './api';

export const TWITTER_FOLLOWERS = createHarvester(TickerType.TWITTER_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await TwitterAPI.screenNameToId(username).catch(() => null);

		if (!body) {
			throw new Error('Twitter user could not be found');
		}

		return {
			success: true,
			platform_id: body,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const twitterUser = await TwitterAPI.user(ticker.platform_id);

		return twitterUser.followers_count;
	},
});
