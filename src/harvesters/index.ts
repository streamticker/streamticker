import {TickerType} from '@prisma/client';
import {Harvester} from './harvester';
import {DISCORD_BOOSTS} from './impl/discord/boosts';
import {GITHUB_FOLLOWERS} from './impl/github/followers';
import {GITHUB_REPO_STARS} from './impl/github/stars';

export const harvesters: Record<TickerType, Harvester> = {
	DISCORD_BOOSTS,
	GITHUB_REPO_STARS,
	GITHUB_REPO_FORKS: undefined,
	GITHUB_REPO_ISSUES: undefined,
	GITHUB_FOLLOWERS,
	TWITCH_FOLLOWERS: undefined,
	YOUTUBE_SUBSCRIBERS: undefined,
	YOUTUBE_VIEWCOUNT: undefined,
	DISCORD_MEMBERS: undefined,
	DISCORD_MEMBERS_ROLE: undefined,
	DISCORD_HUMANS: undefined,
	DISCORD_BOTS: undefined,
	REDDIT_SUBSCRIBERS: undefined,
	OPENSEA_COLLECTION_FLOOR: undefined,
	OPENSEA_COLLECTION_VOLUME: undefined,
	OPENSEA_COLLECTION_UNIQUE_HOLDERS: undefined,
	OPENSEA_COLLECTION_SUPPLY: undefined,
	TWITTER_FOLLOWERS: undefined,
	SELF_TICKERS: undefined,
	SELF_GUILDS: undefined,
	GUILD_TICKERS: undefined,
};
