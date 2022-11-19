import {TickerType} from '@prisma/client';
import {FORMATTER_REPLACER} from '../../harvesters/harvester';

export const tickerTypeNames: Record<TickerType, string> = {
	[TickerType.GITHUB_REPO_STARS]: 'GitHub repository stars (input required)',
	[TickerType.GITHUB_REPO_FORKS]: 'GitHub repository forks (input required)',
	[TickerType.GITHUB_REPO_ISSUES]: 'GitHub repository issues (input required)',
	[TickerType.GITHUB_FOLLOWERS]: 'GitHub followers (input required)',
	[TickerType.TWITCH_FOLLOWERS]: 'Twitch followers (input required)',
	[TickerType.TWITTER_FOLLOWERS]: 'Twitter followers (input required)',
	[TickerType.YOUTUBE_SUBSCRIBERS]: 'YouTube subscribers (input required)',
	[TickerType.YOUTUBE_VIEWCOUNT]: 'YouTube view count (input required)',
	[TickerType.DISCORD_MEMBERS]: 'Discord members',
	[TickerType.DISCORD_MEMBERS_ROLE]: 'Discord members in a role (input required)',
	[TickerType.DISCORD_BOOSTS]: 'Discord server boosts',
	[TickerType.DISCORD_HUMANS]: 'Discord members (only users)',
	[TickerType.DISCORD_BOTS]: 'Discord members (only bots)',
	[TickerType.REDDIT_SUBSCRIBERS]: 'Reddit Subreddit subscribers',
	[TickerType.OPENSEA_COLLECTION_FLOOR]: 'OpenSea collection floor price (input required)',
	[TickerType.OPENSEA_COLLECTION_VOLUME]: 'OpenSea collection total volume (input required)',
	[TickerType.OPENSEA_COLLECTION_UNIQUE_HOLDERS]:
		'OpenSea collection unique holders (input required)',
	[TickerType.OPENSEA_COLLECTION_SUPPLY]: 'OpenSea collection supply (input required)',
	[TickerType.TIKTOK_FOLLOWERS]: 'TikTok Followers (**IN BETA**) (input required)',
	[TickerType.TIKTOK_LIKE_COUNT]: 'TikTok Like Count (**IN BETA**) (input required)',
	[TickerType.INSTAGRAM_FOLLOWERS]: 'Instagram Followers (**IN BETA**) (input required)',
	[TickerType.ROBLOX_FOLLOWERS]: 'Roblox Followers (input required)',
	[TickerType.ROBLOX_GROUP_MEMBERS]: 'Roblox Group Members (input required)',
	[TickerType.ROBLOX_FRIENDS]: 'Roblox Friends (input required)',
};

export const tickerDescriptions: Record<TickerType, string> = {
	[TickerType.GITHUB_REPO_STARS]: 'The amount of stars on a public GitHub repository',
	[TickerType.GITHUB_REPO_FORKS]: 'The amount of forks on a public GitHub repository',
	[TickerType.GITHUB_REPO_ISSUES]: 'The amount of open issues on a public GitHub repository',
	[TickerType.GITHUB_FOLLOWERS]: 'The amount of followers on a GitHub user',
	[TickerType.TWITCH_FOLLOWERS]: 'The amount of followers on a Twitch user',
	[TickerType.TWITTER_FOLLOWERS]: 'The amount of followers on a Twitter user',
	[TickerType.YOUTUBE_SUBSCRIBERS]: 'The amount of subscribers on a YouTube channel',
	[TickerType.YOUTUBE_VIEWCOUNT]: 'The amount of views on a YouTube channel',
	[TickerType.DISCORD_MEMBERS]: 'The amount of members in a Discord server',
	[TickerType.DISCORD_MEMBERS_ROLE]:
		'The amount of members in a Discord server with a specific role',
	[TickerType.DISCORD_BOOSTS]: 'The amount of boosts in a Discord server',
	[TickerType.DISCORD_HUMANS]: 'The amount of human members in a Discord server',
	[TickerType.DISCORD_BOTS]: 'The amount of bot members in a Discord server',
	[TickerType.REDDIT_SUBSCRIBERS]: 'The amount of subscribers on a Subreddit',
	[TickerType.OPENSEA_COLLECTION_FLOOR]: 'The floor price of an OpenSea collection',
	[TickerType.OPENSEA_COLLECTION_VOLUME]: 'The total volume of an OpenSea collection',
	[TickerType.OPENSEA_COLLECTION_UNIQUE_HOLDERS]:
		'The amount of unique holders of an OpenSea collection',
	[TickerType.OPENSEA_COLLECTION_SUPPLY]: 'The supply of an OpenSea collection',
	[TickerType.TWITTER_FOLLOWERS]: 'The amount of followers on a Twitter user',
	[TickerType.TIKTOK_FOLLOWERS]: 'The amount of followers on a TikTok user',
	[TickerType.TIKTOK_LIKE_COUNT]: 'The amount of likes on a TikTok user',
	[TickerType.INSTAGRAM_FOLLOWERS]: 'The amount of followers on a Instagram user',
	[TickerType.ROBLOX_FOLLOWERS]: 'The amount of followers on a Roblox user',
	[TickerType.ROBLOX_GROUP_MEMBERS]: 'The amount of members in a Roblox group',
	[TickerType.ROBLOX_FRIENDS]: 'The amount of friends a Roblox user has',
};

export const defaultTickerFormats: Record<
	TickerType,
	`${string}${typeof FORMATTER_REPLACER}${string}`
> = {
	[TickerType.GITHUB_REPO_STARS]: `Repo Stars: ${FORMATTER_REPLACER}`,
	[TickerType.GITHUB_REPO_FORKS]: `Repo Forks: ${FORMATTER_REPLACER}`,
	[TickerType.GITHUB_REPO_ISSUES]: `Repo Issues: ${FORMATTER_REPLACER}`,
	[TickerType.GITHUB_FOLLOWERS]: `GitHub Followers: ${FORMATTER_REPLACER}`,
	[TickerType.TWITCH_FOLLOWERS]: `Twitch Followers: ${FORMATTER_REPLACER}`,
	[TickerType.TWITTER_FOLLOWERS]: `Twitter Followers: ${FORMATTER_REPLACER}`,
	[TickerType.YOUTUBE_SUBSCRIBERS]: `Subscribers: ${FORMATTER_REPLACER}`,
	[TickerType.YOUTUBE_VIEWCOUNT]: `Views: ${FORMATTER_REPLACER}`,
	[TickerType.DISCORD_MEMBERS]: `Members: ${FORMATTER_REPLACER}`,
	[TickerType.DISCORD_MEMBERS_ROLE]: `Humans with role: ${FORMATTER_REPLACER}`,
	[TickerType.DISCORD_BOOSTS]: `Server Boosts: ${FORMATTER_REPLACER}`,
	[TickerType.DISCORD_HUMANS]: `Humans: ${FORMATTER_REPLACER}`,
	[TickerType.DISCORD_BOTS]: `Bots: ${FORMATTER_REPLACER}`,
	[TickerType.REDDIT_SUBSCRIBERS]: `Reddit Subscribers: ${FORMATTER_REPLACER}`,
	[TickerType.OPENSEA_COLLECTION_FLOOR]: `Floor: ${FORMATTER_REPLACER} Ξ`,
	[TickerType.OPENSEA_COLLECTION_VOLUME]: `Volume: ${FORMATTER_REPLACER} Ξ`,
	[TickerType.OPENSEA_COLLECTION_UNIQUE_HOLDERS]: `Unique Holders: ${FORMATTER_REPLACER}`,
	[TickerType.OPENSEA_COLLECTION_SUPPLY]: `Supply: ${FORMATTER_REPLACER}`,
	[TickerType.TIKTOK_FOLLOWERS]: `TikTok Followers: ${FORMATTER_REPLACER}`,
	[TickerType.TIKTOK_LIKE_COUNT]: `TikTok Like Count: ${FORMATTER_REPLACER}`,
	[TickerType.INSTAGRAM_FOLLOWERS]: `Instagram Followers: ${FORMATTER_REPLACER}`,
	[TickerType.ROBLOX_FOLLOWERS]: `Roblox Followers: ${FORMATTER_REPLACER}`,
	[TickerType.ROBLOX_GROUP_MEMBERS]: `Group Members: ${FORMATTER_REPLACER}`,
	[TickerType.ROBLOX_FRIENDS]: `Roblox Friends: ${FORMATTER_REPLACER}`,
};

enum TickerCategory {
	SOCIAL = 'SOCIAL',
	DISCORD = 'DISCORD',
	UTIL = 'UTIL',
	OPENSEA = 'OPENSEA',
}

export const tickerSort: Record<TickerCategory, TickerType[]> = {
	[TickerCategory.SOCIAL]: [
		TickerType.TWITCH_FOLLOWERS,
		TickerType.TWITTER_FOLLOWERS,
		TickerType.YOUTUBE_SUBSCRIBERS,
		TickerType.YOUTUBE_VIEWCOUNT,
		TickerType.TIKTOK_FOLLOWERS,
		TickerType.INSTAGRAM_FOLLOWERS,
		TickerType.ROBLOX_FOLLOWERS,
		TickerType.ROBLOX_GROUP_MEMBERS,
		TickerType.ROBLOX_FRIENDS,
		TickerType.REDDIT_SUBSCRIBERS,
		TickerType.TIKTOK_LIKE_COUNT,
	],
	[TickerCategory.DISCORD]: [
		TickerType.DISCORD_BOOSTS,
		TickerType.DISCORD_HUMANS,
		TickerType.DISCORD_BOTS,
		TickerType.DISCORD_MEMBERS,
		TickerType.DISCORD_MEMBERS_ROLE,
	],
	[TickerCategory.UTIL]: [
		TickerType.GITHUB_FOLLOWERS,
		TickerType.GITHUB_REPO_STARS,
		TickerType.GITHUB_REPO_FORKS,
		TickerType.GITHUB_REPO_ISSUES,
	],
	[TickerCategory.OPENSEA]: [
		TickerType.OPENSEA_COLLECTION_FLOOR,
		TickerType.OPENSEA_COLLECTION_VOLUME,
		TickerType.OPENSEA_COLLECTION_UNIQUE_HOLDERS,
		TickerType.OPENSEA_COLLECTION_SUPPLY,
	],
};

export const tickerCategoryTitles: Record<TickerCategory, string> = {
	[TickerCategory.SOCIAL]: 'Social Tickers',
	[TickerCategory.DISCORD]: 'Discord Tickers',
	[TickerCategory.UTIL]: 'Utility Tickers',
	[TickerCategory.OPENSEA]: 'OpenSea Tickers',
};

export const serviceTitles: Record<string, string> = {
	opensea: 'OpenSea',
	twitch: 'Twitch',
	twitter: 'Twitter',
	youtube: 'YouTube',
	discord: 'Discord',
	github: 'GitHub',
	reddit: 'Reddit',
	tiktok: 'TikTok',
	instagram: 'Instagram',
	roblox: 'Roblox',
	minecraft: 'Minecraft',
};

export const tickerServiceTitles: Record<string, TickerType[]> = {
	youtube: [TickerType.YOUTUBE_SUBSCRIBERS, TickerType.YOUTUBE_VIEWCOUNT],
	twitch: [TickerType.TWITCH_FOLLOWERS],
	twitter: [TickerType.TWITTER_FOLLOWERS],
	github: [
		TickerType.GITHUB_FOLLOWERS,
		TickerType.GITHUB_REPO_STARS,
		TickerType.GITHUB_REPO_FORKS,
		TickerType.GITHUB_REPO_ISSUES,
	],
	reddit: [TickerType.REDDIT_SUBSCRIBERS],
	tiktok: [TickerType.TIKTOK_FOLLOWERS],
	instagram: [TickerType.INSTAGRAM_FOLLOWERS],
	roblox: [TickerType.ROBLOX_FOLLOWERS, TickerType.ROBLOX_GROUP_MEMBERS, TickerType.ROBLOX_FRIENDS],
	opensea: [
		TickerType.OPENSEA_COLLECTION_FLOOR,
		TickerType.OPENSEA_COLLECTION_VOLUME,
		TickerType.OPENSEA_COLLECTION_UNIQUE_HOLDERS,
		TickerType.OPENSEA_COLLECTION_SUPPLY,
	],
	discord: [
		TickerType.DISCORD_BOOSTS,
		TickerType.DISCORD_HUMANS,
		TickerType.DISCORD_BOTS,
		TickerType.DISCORD_MEMBERS,
		TickerType.DISCORD_MEMBERS_ROLE,
	],
};
