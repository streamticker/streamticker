import {Ticker, TickerType} from '@prisma/client';
import {APIChannel, ChannelType} from 'discord-api-types/v10';
import {prisma} from '../server/prisma';
import {discord, Routes} from './impl/discord/api';

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

export type ValidateInput = (value: string) => Promise<
	| {
			success: true;
	  }
	| {
			success: false;
			message: string;
	  }
>;

export interface Harvester {
	harvest(ticker: Ticker, utils: HarvesterUtils): Promise<void>;
	validateInput: ValidateInput | null;
}

export interface HarvesterUtils {
	ensureId(ticker: Ticker): asserts ticker is Ticker & {platform_id: string};
}

export function createHarvester<T extends TickerType>(
	type: T,
	config: {
		requirement: TickerRequirement;
		validateInput?: null | ValidateInput;
		harvest(ticker: Omit<Ticker, 'type'> & {type: T}): Promise<number>;
	}
): Harvester {
	return {
		validateInput: config.validateInput ?? null,
		async harvest(ticker: Ticker, utils: HarvesterUtils) {
			if (ticker.type !== type) {
				throw new Error('Received mismatch ticker type! Expected ' + type);
			}

			const value = await config.harvest(ticker as Omit<Ticker, 'type'> & {type: T});

			const formatted = format(ticker, value);

			const channel = (await discord
				.get(Routes.channel(ticker.channel_id))
				.catch(() => null)) as APIChannel | null;

			if (!channel) {
				await prisma.ticker.delete({
					where: {
						channel_id: ticker.channel_id,
					},
				});

				throw new Error('Channel was deleted!');
			}

			if (channel.type !== ChannelType.GuildVoice) {
				throw new Error('Channel is not a voice channel!');
			}

			await discord.patch(Routes.channel(ticker.channel_id), {
				body: {
					name: formatted,
				},
			});
		},
	};
}
