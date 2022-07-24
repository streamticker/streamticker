import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {GitHubAPI} from './api';

export const GITHUB_REPO_STARS = createHarvester(TickerType.GITHUB_REPO_STARS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(value: string) {
		const [owner, repo] = value.split('/');

		if (!owner || !repo) {
			return {
				success: false,
				message: 'Invalid format! Expected `owner/repo`',
			};
		}

		const body = await GitHubAPI.getRepo(owner, repo).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'GitHub repository not found',
			};
		}

		return {
			success: true,
			platform_id: value,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const [owner, repo] = ticker.platform_id.split('/');

		const githubRepo = await GitHubAPI.getRepo(owner, repo);

		return githubRepo.stargazers_count;
	},
});
