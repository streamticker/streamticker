import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {api} from '../../../server/api';
import {env} from '../../../server/env';
import {enqueue} from '../../../server/scheduler';

const schema = z.object({
	auth: z.string(),
});

export default api({
	async GET({req}) {
		const {auth} = schema.parse(req.query);

		if (auth !== env.ADMIN_AUTH) {
			throw new NextkitError(401, 'Unauthorized');
		}

		return enqueue(`https://${req.headers.host}/api/lowcake`);
	},
});
