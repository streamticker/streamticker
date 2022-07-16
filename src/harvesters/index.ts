import {TickerType} from '@prisma/client';
import {Harvester} from './harvester';
import {DISCORD_BOOSTS} from './impl/discord/boosts';
import {GITHUB_FOLLOWERS} from './impl/github/followers';
import {GITHUB_REPO_FORKS} from './impl/github/forks';
import {GITHUB_REPO_ISSUES} from './impl/github/issues';
import {GITHUB_REPO_STARS} from './impl/github/stars';
import {REDDIT_SUBSCRIBERS} from './impl/reddit/subscribers';
import {TWITTER_FOLLOWERS} from './impl/twitter/followers';

export const harvesters: Record<TickerType, Harvester> = {
	DISCORD_BOOSTS,
	GITHUB_REPO_STARS,
	GITHUB_REPO_FORKS,
	GITHUB_REPO_ISSUES,
	GITHUB_FOLLOWERS,
	TWITCH_FOLLOWERS: undefined,
	YOUTUBE_SUBSCRIBERS: undefined,
	YOUTUBE_VIEWCOUNT: undefined,
	DISCORD_MEMBERS: undefined,
	DISCORD_MEMBERS_ROLE: undefined,
	DISCORD_HUMANS: undefined,
	DISCORD_BOTS: undefined,
	REDDIT_SUBSCRIBERS,
	OPENSEA_COLLECTION_FLOOR: undefined,
	OPENSEA_COLLECTION_VOLUME: undefined,
	OPENSEA_COLLECTION_UNIQUE_HOLDERS: undefined,
	OPENSEA_COLLECTION_SUPPLY: undefined,
	TWITTER_FOLLOWERS,
	SELF_TICKERS: undefined,
	SELF_GUILDS: undefined,
	GUILD_TICKERS: undefined,
};
