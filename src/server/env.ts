import axios from 'axios';
import {envsafe, str} from 'envsafe';

export const env = envsafe({
	DISCORD_INTERACTION_PUBLIC_KEY: str({
		desc: 'Discord interaction public key',
	}),

	DISCORD_APP_ID: str({
		desc: 'Discord client ID',
	}),

	DISCORD_BOT_TOKEN: str({}),

	ADMIN_AUTH: str(),

	DISCORD_DEVELOPMENT_SERVER: str({
		default: '822168015956475945',
	}),

	LOWCAKE_API_KEY: str({
		desc: 'Lowcake API key',
	}),

	LOWCAKE_QUEUE_ID: str({
		default: 'queue_NzEyNTc5MDk2MzUzMzQxNDc',
	}),

	TWITTER_SECRET: str({}),

	YOUTUBE_SECRET: str({}),

	OPENSEA_API_KEY: str({}),

	UPSTASH_REDIS_REST_URL: str({}),
	UPSTASH_REDIS_REST_TOKEN: str({}),
	TWITCH_CLIENT_SECRET: str({}),
	TWITCH_CLIENT_ID: str({}),
	WADOKEI_KEY: str({}),
	TOPGG_AUTH: str({}),
	LINEAR_API_KEY: str({}),
	HOP_PROJECT_ID: str({}),
	HOP_API_KEY: str({}),
});
