import {envsafe, str} from 'envsafe';

export const env = envsafe({
	DISCORD_INTERACTION_PUBLIC_KEY: str({
		desc: 'Discord interaction public key',
	}),

	DISCORD_APP_ID: str({
		desc: 'Discord client ID',
	}),

	DISCORD_BOT_TOKEN: str({}),

	SYNC_SECRET: str({
		default: 'lol',
	}),

	DISCORD_DEVELOPMENT_SERVER: str({
		default: '822168015956475945',
	}),
});
