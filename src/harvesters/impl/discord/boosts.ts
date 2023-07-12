import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_BOOSTS = createHarvester(TickerType.DISCORD_BOOSTS, {
	requirement: TickerRequirement.VOTE,
	async harvest(ticker, utils) {
		const guild = await DiscordAPI.getGuild(ticker.guild_id);
		return guild.premium_subscription_count ?? 0;
	},
});
