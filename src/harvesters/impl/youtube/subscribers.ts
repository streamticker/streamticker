import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {YouTubeAPI} from './api';

export const YOUTUBE_SUBSCRIBERS = createHarvester(TickerType.YOUTUBE_SUBSCRIBERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(channelID) {
		if (!channelID) {
			return {
				success: false,
				message: 'Invalid format! Expected `channel ID` (looks like `UCReCeQgvWPmR8aivad-CzKQ`)',
			};
		}

		const body = await YouTubeAPI.getUser(channelID).catch(() => null);

		if (!body) {
			return {
				success: false,
				message:
					"Please make sure you're entering a valid YouTube channel ID! Usernames cannot be used, and IDs usually look like this: `UCReCeQgvWPmR8aivad-CzKQ`",
			};
		}

		return {
			success: true,
			platform_id: channelID,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const youtubeChannel = await YouTubeAPI.getUser(ticker.platform_id);

		return youtubeChannel.subscribers;
	},
});
