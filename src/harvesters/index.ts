import {TickerType} from '@prisma/client';
import {Harvester} from './harvester';

import {DISCORD_BOOSTS} from './impl/discord/boosts';
import {DISCORD_BOTS} from './impl/discord/bots';
import {DISCORD_MEMBERS} from './impl/discord/guild-members';
import {DISCORD_HUMANS} from './impl/discord/humans';
import {DISCORD_MEMBERS_ROLE} from './impl/discord/members-role';
import {GITHUB_FOLLOWERS} from './impl/github/followers';
import {GITHUB_REPO_FORKS} from './impl/github/forks';
import {GITHUB_REPO_ISSUES} from './impl/github/issues';
import {GITHUB_REPO_STARS} from './impl/github/stars';
import {INSTAGRAM_FOLLOWERS} from './impl/instagram/followers';
import {OPENSEA_COLLECTION_FLOOR} from './impl/opensea/floor';
import {OPENSEA_COLLECTION_UNIQUE_HOLDERS} from './impl/opensea/holders';
import {OPENSEA_COLLECTION_SUPPLY} from './impl/opensea/supply';
import {OPENSEA_COLLECTION_VOLUME} from './impl/opensea/volume';
import {REDDIT_SUBSCRIBERS} from './impl/reddit/subscribers';
import {TIKTOK_FOLLOWERS} from './impl/tiktok/followers';
import {TWITCH_FOLLOWERS} from './impl/twitch/followers';
import {TWITTER_FOLLOWERS} from './impl/twitter/followers';
import {YOUTUBE_SUBSCRIBERS} from './impl/youtube/subscribers';
import {YOUTUBE_VIEWCOUNT} from './impl/youtube/viewcount';

export const harvesters: Record<TickerType, Harvester> = {
	GITHUB_REPO_STARS,
	GITHUB_REPO_FORKS,
	GITHUB_REPO_ISSUES,
	GITHUB_FOLLOWERS,
	TWITCH_FOLLOWERS,
	YOUTUBE_SUBSCRIBERS,
	YOUTUBE_VIEWCOUNT,
	DISCORD_BOOSTS,
	DISCORD_MEMBERS,
	DISCORD_HUMANS,
	DISCORD_BOTS,
	DISCORD_MEMBERS_ROLE,
	REDDIT_SUBSCRIBERS,
	OPENSEA_COLLECTION_FLOOR,
	OPENSEA_COLLECTION_VOLUME,
	OPENSEA_COLLECTION_UNIQUE_HOLDERS,
	OPENSEA_COLLECTION_SUPPLY,
	TWITTER_FOLLOWERS,
	TIKTOK_FOLLOWERS,
	INSTAGRAM_FOLLOWERS,
};
