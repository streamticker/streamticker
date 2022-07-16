import create from 'nextkit';

export const api = create({
	onError: async (req, res, err) => {
		console.log(err);

		return {
			status: 500,
			message: err.message,
		};
	},
});
