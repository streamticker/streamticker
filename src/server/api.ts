import create from 'nextkit';

export const api = create({
	onError: async (req, res, err) => ({
		status: 500,
		message: err.message,
	}),
});
