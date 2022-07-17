import create from 'nextkit';

import {prisma} from './prisma';

export const api = create({
	async getContext() {
		return {
			prisma,
		};
	},

	async onError(req, res, err) {
		console.log(err);

		return {
			status: 500,
			message: err.message,
		};
	},
});
