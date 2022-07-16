import {Ticker} from '@prisma/client';
import {CommandInteraction} from 'discord.js';
import {XOR} from '../interactions/util';

export type Resolver = (input: string, interaction: CommandInteraction) => Promise<string>;

export enum TickerRequirement {
	NONE = 1,
	VOTE = 2,
}

export interface HarvesterConfig {
	disabled?: boolean;
	requirement: TickerRequirement;
	strategy: Resolver;
}

export abstract class AbstractHarvester {
	public static readonly FORMATTER_REPLACER = '%v';

	public static format(ticker: Ticker, value: number | string) {
		const rounded = Number(value);
		const prettyFollowers = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return ticker.format.replace(AbstractHarvester.FORMATTER_REPLACER, prettyFollowers);
	}

	public abstract config: HarvesterConfig;
}
