import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {api} from '../../server/api';
import {env} from '../../server/env';
import {creator} from './interaction';

const query = z.object({
	secret: z.string(),
	guild: z
		.enum(['true', 'false'])
		.optional()
		.transform(value => {
			return value === 'true';
		}),
});

export default api({
	async GET({req}) {
		const {secret, guild} = query.parse(req.query);

		if (secret !== env.SYNC_SECRET) {
			throw new NextkitError(401, 'Invalid secret');
		}

		if (guild) {
			await creator.syncCommandsIn(env.DISCORD_DEVELOPMENT_SERVER, true);
		} else {
			await creator.syncCommandsAsync({
				deleteCommands: true,
				syncGuilds: true,
				skipGuildErrors: true,
			});
		}
	},
});
