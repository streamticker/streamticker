import {Hop} from '@onehop/js';
import {writeFile} from 'fs/promises';

// Securely-ish print out the token because i cant tell if
// darn github actions is setting it or not...
console.log(process.env.HOP_PROJECT_TOKEN?.substring(0, 10));

const hop = new Hop(process.env.HOP_PROJECT_TOKEN);

const deployment = await hop.ignite.deployments.get('deployment_bru');

const stringifiedEnv = Object.entries(deployment.config.env)
	.map(entry => {
		const [key, value] = entry;
		return `${key}=${value}`;
	})
	.join('\n');

await writeFile('./.env', stringifiedEnv);
