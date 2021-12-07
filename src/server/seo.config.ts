import {DefaultSeoProps} from 'next-seo';

export const seo: DefaultSeoProps = {
	titleTemplate: 'StreamTicker | %s',
	description: 'Realtime statistics for Discord.',
	openGraph: {
		url: 'https://streamticker.bot',
		title: 'StreamTicker | Home',
		description: 'Realtime statistics for Discord.',
	},
	defaultTitle: 'StreamTicker | Home',
	additionalMetaTags: [
		{
			name: 'theme-color',
			content: '#000000',
		},
	],
	twitter: {
		handle: '@alistaiiiir',
		site: '@alistaiiiir',
		cardType: 'summary_large_image',
	},
};
