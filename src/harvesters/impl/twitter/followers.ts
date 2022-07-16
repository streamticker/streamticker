import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {TwitterAPI} from './api';

export const TWITTER_FOLLOWERS = createHarvester(TickerType.TWITTER_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	validateInput: async username => {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await TwitterAPI.screenNameToId(username).catch(() => null);

		if (!body) {
			throw new Error('Subreddit does not exist');
		}

		return {
			success: true,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const twitterUser = await TwitterAPI.user(ticker.platform_id);

		return twitterUser.followers_count;
	},
});
