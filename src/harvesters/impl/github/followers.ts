import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {GitHubAPI} from './api';

export const GITHUB_FOLLOWERS = createHarvester(TickerType.GITHUB_REPO_STARS, {
	requirement: TickerRequirement.VOTE,
	validateInput: async (username: string) => {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await GitHubAPI.getUser(username).catch(() => null);

		if (!body) {
			throw new Error('User does not exist');
		}

		return {
			success: true,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const githubUser = await GitHubAPI.getUser(ticker.platform_id);

		return githubUser.followers;
	},
});
