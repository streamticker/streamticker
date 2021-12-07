const defaults = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	purge: ['./src/**/*.{ts,tsx,js,jsx,css}'],
	darkMode: 'media',
	mode: 'jit',
	theme: {
		fontFamily: {
			sans: ['Inter Var', 'Inter', ...defaults.fontFamily.sans],
		},
		extend: {
			colors: {
				blurple: '#5865F2',
				shark: {
					50: '#f4f4f4',
					100: '#e9e9e9',
					200: '#c8c7c8',
					300: '#a7a5a7',
					400: '#646265',
					500: '#221f23',
					600: '#1f1c20',
					700: '#1a171a',
					800: '#141315',
					900: '#110f11',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
