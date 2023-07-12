import {TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_BOTS = createHarvester(TickerType.DISCORD_BOTS, {
	requirement: TickerRequirement.NONE,
	async harvest(ticker) {
		const members = await DiscordAPI.getGuildMembers(ticker.guild_id);
		return members.filter(m => Boolean(m.user?.bot)).length;
	},
});
