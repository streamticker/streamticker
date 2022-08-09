import {Hop} from '@onehop/js';
import {writeFile} from 'fs/promises';

const hop = new Hop(process.env.HOP_API_KEY);

const deployment = await hop.ignite.deployments.get(process.env.HOP_DEPLOYMENT_ID);

const stringifiedEnv = Object.entries(deployment.config.env)
	.map(entry => {
		const [key, value] = entry;
		return `${key}=${value}`;
	})
	.join('\n');

await writeFile('../.env.ci', stringifiedEnv);
