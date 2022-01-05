module.exports = {
	async redirects() {
		return [
			{
				source: '/invite',
				destination:
					'https://discord.com/api/oauth2/authorize?client_id=822117936251928586&permissions=1051664&scope=applications.commands%20bot',
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
