module.exports = {
	async redirects() {
		return [
			{
				source: '/invite',
				destination:
					'https://discord.com/oauth2/authorize?scope=bot&client_id=822117936251928586&permissions=8',
				permanent: true,
			},
			{
				source: '/support',
				destination:
					'https://discord.gg/gdH3whZ9cj',
				permanent: true,
			},
		];
	},
};
