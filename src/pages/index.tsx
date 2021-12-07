import Image from 'next/image';
import React from 'react';
import heroAsset from '../client/images/hero-asset.png';
import {FiArrowUpRight} from 'react-icons/fi';
import {SlashCommandStack} from '../client/components/slash-command';

const cta = (
	<div className="space-x-4 text-center md:text-left">
		<a
			href="/invite"
			className="bg-blurple transition-all transform-gpu hover:bg-opacity-50 active:scale-95 duration-500 shadow-lg text-white dark:hover:text-opacity-50 rounded-full px-4 py-1 text-lg inline-flex items-center space-x-2"
		>
			<span>Invite</span>
			<FiArrowUpRight />
		</a>
	</div>
);

export default function Home() {
	return (
		<main>
			<div className="py-24 space-y-8">
				<div className="relative z-10 flex justify-center">
					<div className="max-w-md md:max-w-none w-full">
						<SlashCommandStack command="ticker" description="Creates a new ticker" />
					</div>
				</div>

				<div className="relative flex flex-col md:flex-row md:space-x-16 items-center">
					<div className="relative z-10 space-y-6 w-full">
						<h1 className="lg:leading-[78px] tracking-tighter text-center md:text-left md:max-w-nonetext-4xl text-4xl lg:text-6xl font-extrabold">
							<span>Realtime statistics for Discord</span>
							<span className="opacity-50">.</span>
						</h1>

						<p className="text-lg opacity-75 text-center md:text-left mx-auto md:mx-0 w-2/3">
							Get realtime statistics about anything online. From Twitter followers to an OpenSea
							Collection Floor price. Free forever.
						</p>

						{cta}
					</div>

					<div className="absolute -top-18 dark:opacity-75">
						<Image src={heroAsset} alt="hero" />
					</div>
				</div>
			</div>
		</main>
	);
}
