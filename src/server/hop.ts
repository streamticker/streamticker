import {env} from './env';
import {APIAuthentication, Hop} from '@onehop/js';

const hop = new Hop(env.HOP_API_KEY as APIAuthentication);

export const HopAPI = {
	async getDeployments(): Promise<Container[]> {
		const containers = await hop.ignite.deployments.getAll(
			env.HOP_PROJECT_ID as `project_${string}`
		);
		const deployments = Promise.all(
			containers.map(async container => {
				const [deployment] = await hop.ignite.deployments.getContainers(container.id);
				return {
					name: container.name,
					id: container.id,
					state: deployment.state,
					uptime: deployment.uptime.last_start,
				};
			})
		);
		return deployments;
	},
};

type Container = {
	name: string;
	id: string;
	state: string;
	uptime: string;
};
