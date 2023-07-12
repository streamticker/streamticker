import {TickerType} from '@prisma/client';
import {createHarvester, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_MEMBERS = createHarvester(TickerType.DISCORD_MEMBERS, {
	requirement: TickerRequirement.NONE,
	async harvest(ticker) {
		const members = await DiscordAPI.getGuildMembers(ticker.guild_id);
		return members.length;
	},
});
