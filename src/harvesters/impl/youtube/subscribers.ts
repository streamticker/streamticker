import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {YouTubeAPI} from './api';

export const YOUTUBE_SUBSCRIBERS = createHarvester(TickerType.YOUTUBE_SUBSCRIBERS, {
	requirement: TickerRequirement.VOTE,
	validateInput: async channelID => {
		if (!channelID) {
			return {
				success: false,
				message: 'Invalid format! Expected `channel ID` (looks like `UCReCeQgvWPmR8aivad-CzKQ`)',
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
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const youtubeChannel = await YouTubeAPI.getUser(ticker.platform_id);

		return youtubeChannel.subscribers;
	},
});
