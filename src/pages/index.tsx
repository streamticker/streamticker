import Image from 'next/image';
import React from 'react';
import heroAsset from '../client/images/hero-asset.png';
import {FiArrowUpRight} from 'react-icons/fi';
import {SlashCommandStack} from '../client/components/slash-command';

const cta = (
	<div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row text-center md:items-center md:text-left">
		<div>
			<a
				href="/invite"
				className="bg-blurple transition-all transform-gpu hover:bg-opacity-50 active:scale-95 duration-500 shadow-lg text-white dark:hover:text-opacity-50 rounded-full px-4 py-1 inline-flex items-center space-x-2"
			>
				<span>Add StreamTicker</span>
				<FiArrowUpRight />
			</a>
		</div>

		<span className="text-shark-900 text-opacity-50 dark:text-white dark:text-opacity-50">
			Free forever
		</span>
	</div>
);

export default function Home() {
	return (
		<div className="py-24 mx-auto max-w-4xl px-5">
			<main className="space-y-16">
				<div className="py-24 space-y-8">
					<div className="relative z-10 flex justify-center md:justify-start">
						<div className="max-w-md md:max-w-sm w-full">
							<SlashCommandStack command="ticker" description="Creates a new ticker" />
						</div>
					</div>

					<div className="relative flex flex-col md:flex-row md:space-x-16 items-center">
						<div className="relative z-10 space-y-6 w-full">
							<h1 className="lg:leading-[78px] tracking-tighter text-center md:text-left md:max-w-nonetext-4xl text-4xl lg:text-6xl font-extrabold">
								<span>Realtime statistics for Discord</span>
								<span className="opacity-50">.</span>
							</h1>

							<p className="text-lg opacity-75 text-center md:text-left mx-auto md:mx-0 md:w-2/3">
								Get realtime statistics about anything online. From Twitter followers to an OpenSea
								Collection Floor price.
							</p>

							{cta}
						</div>

						<div className="absolute -top-38 -right-56 dark:opacity-75">
							<Image src={heroAsset} alt="hero" />
						</div>
					</div>
				</div>

				<div className="relative z-10 space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">What is StreamTicker?</h1>
					<p className="opacity-75 leading-relaxed">
						StreamTicker is a Discord bot that allows you to get realtime statistics about anything
						online. It pulls data from Twitter, Twitch, YouTube and many more services. It pulls
						data at a set interval before updating a voice channel with the new numerical value
					</p>
					<p className="opacity-75 leading-relaxed">
						It supports custom formatting and even comes with premade presets that you can apply to
						any channel to quickly edit the vibe and aesthetic of your Discord setup server.
						It&apos;s the perfect way to add some functionality and style to your community
					</p>
				</div>

				<div className="relative z-10 space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">Commands</h1>
					<p className="opacity-75 leading-relaxed">lorum ipsum doler sit amet</p>
				</div>

				<div className="relative z-10 space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">Do I have to pay?</h1>
					<p className="opacity-75 leading-relaxed">
						Nope! StreamTicker&apos;s core functionality will stay free forever, as promised. We
						hide some features behind voting on top.gg and have extensive plans to build paid-for
						features in the future.
					</p>
				</div>

				<div className="space-y-4">
					<h1 className="text-6xl font-bold tracking-tight">What are you waiting for?</h1>
					<p className="opacity-75 leading-relaxed">Invite now and never miss a beat</p>
					{cta}
				</div>
			</main>
		</div>
	);
}
