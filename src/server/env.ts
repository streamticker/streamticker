import {envsafe, str} from 'envsafe';

export const env = envsafe({
	DISCORD_INTERACTION_PUBLIC_KEY: str({
		desc: 'Discord interaction public key',
		devDefault: 'eff949fe0b8e95f31381ed8703e7a0c05aaa3a1fbf90e798620b1e7297ccc720',
	}),
});
