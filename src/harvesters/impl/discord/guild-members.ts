import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_MEMBERS = createHarvester(TickerType.DISCORD_MEMBERS, {
	requirement: TickerRequirement.NONE,
	async harvest(ticker, utils: HarvesterUtils) {
		return DiscordAPI.getGuildMemberCount(ticker.guild_id);
	},
});
