import {Ticker, TickerType} from '@prisma/client';
import {prisma} from '../server/prisma';
import {XOR} from '../interactions/util';
import type {Client} from 'discord.js';

export enum TickerRequirement {
	NONE = 1 << 0,
	VOTE = 1 << 1,
}

export const FORMATTER_REPLACER = '%v';

export function format(ticker: Ticker, value: number | string) {
	const humanized = Number(value)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return ticker.format.replace(FORMATTER_REPLACER, humanized);
}

export interface Harvester {
	harvest(ticker: Ticker, client: Client<true>): Promise<void>;
	validateInput: ((value: string) => Promise<boolean>) | null;
}

export function createHarvester<T extends TickerType>(
	type: T,
	config: {
		requirement: TickerRequirement;
		validateInput?: null | ((value: string) => Promise<boolean>);
		harvest(ticker: Omit<Ticker, 'type'> & {type: T}, client: Client<true>): Promise<number>;
	}
): Harvester {
	return {
		validateInput: config.validateInput ?? null,
		async harvest(ticker: Ticker, client: Client<true>) {
			if (ticker.type !== type) {
				throw new Error('Received mismatch ticker type! Expected ' + type);
			}

			const value = await config.harvest(ticker as Omit<Ticker, 'type'> & {type: T}, client);

			const formatted = format(ticker, value);

			const channel = await client.channels.fetch(ticker.channel_id);

			if (!channel) {
				await prisma.ticker.delete({
					where: {
						channel_id: ticker.channel_id,
					},
				});

				throw new Error('Channel was deleted!');
			}

			if (channel.type !== 'GUILD_VOICE') {
				throw new Error('Channel is not a voice channel!');
			}

			await channel.edit({
				name: formatted,
			});
		},
	};
}
