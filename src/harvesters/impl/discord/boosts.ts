import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_BOOSTS = createHarvester(TickerType.DISCORD_BOOSTS, {
	requirement: TickerRequirement.VOTE,
	async harvest(ticker, utils) {
		throw new Error('not implemented');
	},
});
