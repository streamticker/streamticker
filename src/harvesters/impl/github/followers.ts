import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {GitHubAPI} from './api';

export const GITHUB_FOLLOWERS = createHarvester(TickerType.GITHUB_FOLLOWERS, {
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
			platform_id: body.id.toString(),
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const githubUser = await GitHubAPI.getUserByID(ticker.platform_id);

		return githubUser.followers;
	},
});
