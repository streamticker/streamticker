import {env} from './env';
import type {APIAuthentication} from '@onehop/js';
import {Hop} from '@onehop/js';

const hop = new Hop(env.HOP_API_KEY as APIAuthentication);

export const HopAPI = {
	async getAllProjectDeployments() {
		const deployments = await hop.ignite.deployments.getAll(
			env.HOP_PROJECT_ID as `project_${string}`
		);

		return Promise.all(
			deployments.map(async deployment => ({
				...deployment,
				containers: await deployment.getContainers(),
			}))
		);
	},
};
