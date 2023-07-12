import {TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_HUMANS = createHarvester(TickerType.DISCORD_HUMANS, {
	requirement: TickerRequirement.NONE,
	async harvest(ticker) {
		const members = await DiscordAPI.getGuildMembers(ticker.guild_id);
		return members.filter(m => !m.user?.bot).length;
	},
});
