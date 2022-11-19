import {Ticker, TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {GitHubAPI} from './api';

export const GITHUB_REPO_ISSUES = createHarvester(TickerType.GITHUB_REPO_ISSUES, {
	requirement: TickerRequirement.VOTE,
	async validateInput(value: string) {
		const [owner, repo] = value.split('/');

		if (!owner || !repo) {
			return {
				success: false,
				message: 'Input missing! Expected `owner/repo`',
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

		return githubRepo.open_issues_count;
	},
});
