import create, {NextkitError} from 'nextkit';

import {prisma} from './prisma';

export const api = create({
	async getContext(req) {
		const token = req.cookies.token ?? null;

		return {
			prisma,

			async getUser() {
				if (!token) {
					throw new NextkitError(401, 'Unauthorized');
				}
			},
		};
	},

	async onError(req, res, err) {
		return {
			status: 500,
			message: err.message,
		};
	},
});
