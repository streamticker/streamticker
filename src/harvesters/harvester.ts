import {Ticker, TickerType} from '@prisma/client';
import {APIChannel, ChannelType} from 'discord-api-types/v10';
import {DiscordAPI} from './impl/discord/api';

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

export type ValidateInput = (
	value: string,
	guildId: string
) => Promise<
	| {
			success: true;
			platform_id: string;
	  }
	| {
			success: false;
			message: string;
	  }
>;

export interface Harvester {
	validateInput: ValidateInput | null;
	harvest(ticker: Ticker): Promise<
		| {
				success: true;
		  }
		| {
				success: false;
				code: 'CHANNEL_DELETED' | 'NOT_VOICE_CHANNEL' | 'TYPE_MISMATCH' | 'TIMEOUT';
		  }
	>;
}

export interface HarvesterUtils {
	ensureId(ticker: Ticker): asserts ticker is Ticker & {platform_id: string};
}

export function createHarvester<T extends TickerType>(
	type: T,
	config: {
		requirement: TickerRequirement;
		validateInput?: null | ValidateInput;
		harvest(
			ticker: Omit<Ticker, 'type'> & {type: T},
			utils: HarvesterUtils
		): Promise<number | string>;
	}
): Harvester {
	const utils: HarvesterUtils = {
		ensureId(ticker) {
			if (!ticker.platform_id) {
				throw new Error('Expected `.platform_id` for ticker ' + ticker.channel_id);
			}
		},
	};

	return {
		validateInput: config.validateInput ?? null,
		async harvest(ticker) {
			if (ticker.type !== type) {
				return {
					success: false,
					code: 'TYPE_MISMATCH',
				};
			}

			const promise = config.harvest(ticker as Omit<Ticker, 'type'> & {type: T}, utils);

			const value = await Promise.race([
				promise,
				new Promise<never>((resolve, reject) => {
					setTimeout(reject, 10_000);
				}),
			]).catch(() => null);

			if (!value) {
				return {
					success: false,
					code: 'TIMEOUT',
				};
			}

			const channel = await DiscordAPI.getChannel(ticker.channel_id).catch(() => null);

			if (!channel) {
				return {
					success: false,
					code: 'CHANNEL_DELETED',
				};
			}

			if (channel.type !== ChannelType.GuildVoice) {
				return {
					success: false,
					code: 'NOT_VOICE_CHANNEL',
				};
			}

			await DiscordAPI.editChannel(ticker.channel_id, {
				name: format(ticker, value),
			});

			return {
				success: true,
			};
		},
	};
}
