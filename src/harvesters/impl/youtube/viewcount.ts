import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {YouTubeAPI} from './api';

export const YOUTUBE_VIEWCOUNT = createHarvester(TickerType.YOUTUBE_VIEWCOUNT, {
	requirement: TickerRequirement.VOTE,
	async validateInput(channelID) {
		if (!channelID) {
			return {
				success: false,
				message: 'Input missing! Expected `channel ID` (looks like `UCReCeQgvWPmR8aivad-CzKQ`)',
			};
		}

		const body = await YouTubeAPI.getUser(channelID).catch(() => null);

		if (!body) {
			throw new Error(
				"Please make sure you're entering a valid YouTube channel ID! Usernames cannot be used, and IDs usually look like this: `UCReCeQgvWPmR8aivad-CzKQ`"
			);
		}

		return {
			success: true,
			platform_id: channelID,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const youtubeChannel = await YouTubeAPI.getUser(ticker.platform_id);

		return youtubeChannel.viewCount;
	},
});
