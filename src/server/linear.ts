import {LinearClient} from '@linear/sdk';
import {env} from './env';

export const linear = new LinearClient({
	apiKey: env.LINEAR_API_KEY,
});
