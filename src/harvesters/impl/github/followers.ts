import {Ticker, TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {GitHubAPI} from './api';

export const GITHUB_FOLLOWERS = createHarvester(TickerType.GITHUB_FOLLOWERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(username: string) {
		if (!username) {
			return {
				success: false,
				message: 'Invalid format! Expected `username`',
			};
		}

		const body = await GitHubAPI.getUser(username).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'GitHub user not found',
			};
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
