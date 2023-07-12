import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {api} from '../../../server/api';
import {env} from '../../../server/env';
import {dequeue} from '../../../server/scheduler';

const schema = z.object({
	job: z.string(),
	auth: z.string(),
});

export default api({
	async GET({req}) {
		const {job, auth} = schema.parse(req.query);

		if (auth !== env.ADMIN_AUTH) {
			throw new NextkitError(401, 'Unauthorized');
		}

		return dequeue(env.LOWCAKE_QUEUE_ID, job);
	},
});
