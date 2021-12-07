import React, {useEffect, useRef} from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';

import 'tailwindcss/tailwind.css';
import '../client/styles/main.css';
import {loadCursor} from '../client/cursor';
import {DefaultSeo} from 'next-seo';
import {seo} from '../server/seo.config';

export default function App({Component, pageProps}: AppProps) {
	const ballCanvas = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined' || !ballCanvas.current) {
			return;
		}

		return loadCursor(ballCanvas.current);
	}, []);

	return (
		<>
			<DefaultSeo {...seo} />
			<SWRConfig value={{fetcher}}>
				<div className="py-24 mx-auto max-w-4xl px-5">
					<Component {...pageProps} />
				</div>

				<div
					ref={ballCanvas}
					className="opacity-0 fixed ball-transitions duration-200 pointer-events-none z-30 h-6 w-6 bg-transparent border border-shark-900 dark:border-shark-50 rounded-full shadow-md"
				/>
			</SWRConfig>
		</>
	);
}
