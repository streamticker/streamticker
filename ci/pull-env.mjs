import {Hop} from '@onehop/js';
import {writeFile} from 'fs/promises';

console.log('Token exists:', typeof process.env.HOP_PROJECT_TOKEN !== 'undefined');

const hop = new Hop(process.env.HOP_PROJECT_TOKEN);

const deployment = await hop.ignite.deployments.get('deployment_bru');

const stringifiedEnv = Object.entries(deployment.config.env)
	.map(entry => {
		const [key, value] = entry;
		return `${key}=${value}`;
	})
	.join('\n');

await writeFile('./.env', stringifiedEnv);
