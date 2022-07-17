import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {RedditAPI} from './api';

export const REDDIT_SUBSCRIBERS = createHarvester(TickerType.REDDIT_SUBSCRIBERS, {
	requirement: TickerRequirement.VOTE,
	validateInput: async subreddit => {
		if (!subreddit) {
			return {
				success: false,
				message: 'Invalid format! Expected `subreddit`',
			};
		}

		const body = await RedditAPI.getSubreddit(subreddit).catch(() => null);

		if (!body) {
			throw new Error('Subreddit does not exist');
		}

		return {
			success: true,
			platform_id: subreddit,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const subreddit = await RedditAPI.getSubreddit(ticker.platform_id);

		return subreddit.subreddit_subscribers;
	},
});
