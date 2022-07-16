import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {YouTubeAPI} from './api';

export const YOUTUBE_VIEWCOUNT = createHarvester(TickerType.YOUTUBE_VIEWCOUNT, {
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

		if (!body.viewCount) {
			throw new Error(
				"The YouTube channel was found, however the view count for this channel could not be found. Unfortunately this issue cannnot be resolved by us. Please do `/support` and let StreamTicker's developers know."
			);
		}

		return {
			success: true,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const youtubeChannel = await YouTubeAPI.getUser(ticker.platform_id);

		return youtubeChannel.viewCount;
	},
});
