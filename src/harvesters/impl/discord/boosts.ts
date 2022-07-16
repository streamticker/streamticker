import {Ticker, TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_BOOSTS = createHarvester(TickerType.DISCORD_BOOSTS, {
	requirement: TickerRequirement.VOTE,
	async harvest(ticker, client, ctx) {
		const guild = await client.guilds.fetch({
			guild: ticker.guild_id,
		});

		return DiscordAPI.getBoosts(guild);
	},
});
