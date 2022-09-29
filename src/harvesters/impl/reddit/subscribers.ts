import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {RedditAPI} from './api';

export const REDDIT_SUBSCRIBERS = createHarvester(TickerType.REDDIT_SUBSCRIBERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(subreddit) {
		if (!subreddit) {
			return {
				success: false,
				message: 'Invalid format! Expected `subreddit`',
			};
		}

		const body = await RedditAPI.getSubreddit(subreddit).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'Subreddit does not exist',
			};
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
