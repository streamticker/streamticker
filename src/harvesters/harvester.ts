import {DiscordAPIError} from '@discordjs/rest';
import {Ticker, TickerType} from '@prisma/client';
import {APIChannel, ChannelType} from 'discord-api-types/v10';
import {prisma} from '../server/prisma';
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
				discord_error: false;
				code:
					| 'CHANNEL_DELETED'
					| 'NOT_VOICE_CHANNEL'
					| 'TYPE_MISMATCH'
					| 'TIMEOUT_HARVESTING'
					| 'TIMEOUT_UPDATING_CHANNEL';
		  }
		| {
				success: false;
				discord_error: true;
				code: string | number;
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
					discord_error: false,
					code: 'TYPE_MISMATCH',
				};
			}

			const promise = config.harvest(ticker as Omit<Ticker, 'type'> & {type: T}, utils);

			const value = await Promise.race([
				promise,
				new Promise<never>((resolve, reject) => {
					setTimeout(reject, 30_000);
				}),
			]).catch(() => null);

			if (value === null) {
				return {
					success: false,
					discord_error: false,
					code: 'TIMEOUT_HARVESTING',
				};
			}

			const channel = await DiscordAPI.getChannel(ticker.channel_id).catch((err: DiscordAPIError) =>
				err.code.toString()
			);

			if (typeof channel === 'string') {
				if (channel === '10003') {
					await prisma.ticker.delete({
						where: {
							channel_id: ticker.channel_id,
						},
					});

					return {
						success: false,
						discord_error: false,
						code: 'CHANNEL_DELETED',
					};
				}

				return {
					success: false,
					discord_error: true,
					code: channel,
				};
			}

			if (!channel) {
				await prisma.ticker.delete({
					where: {
						channel_id: ticker.channel_id,
					},
				});

				return {
					success: false,
					discord_error: false,
					code: 'CHANNEL_DELETED',
				};
			}

			if (channel.type !== ChannelType.GuildVoice) {
				return {
					success: false,
					discord_error: false,
					code: 'NOT_VOICE_CHANNEL',
				};
			}

			const updateChannel = await DiscordAPI.editChannel(ticker.channel_id, {
				name: format(ticker, value),
			});

			const updateRace = await Promise.race([
				updateChannel,
				new Promise<never>((resolve, reject) => {
					setTimeout(reject, 30_000);
				}),
			]).catch(() => null);

			if (updateRace === null) {
				return {
					success: false,
					discord_error: true,
					code: 'TIMEOUT_UPDATING_CHANNEL',
				};
			}

			return {
				success: true,
			};
		},
	};
}
