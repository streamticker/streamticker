import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export const DISCORD_MEMBERS_ROLE = createHarvester(TickerType.DISCORD_MEMBERS_ROLE, {
	requirement: TickerRequirement.NONE,

	async validateInput(roleId, guildId) {
		const roles = await DiscordAPI.getRoles(guildId);

		const role = roles.find(role => role.name === roleId || role.id === roleId);

		if (!role) {
			return {
				success: false,
				message: 'Unable to find a role with that name or id!',
			};
		}

		return {
			success: true,
			platform_id: role.id,
		};
	},

	async harvest(ticker, util: HarvesterUtils) {
		util.ensureId(ticker);

		const members = await DiscordAPI.getGuildMembers(ticker.guild_id);

		return members.filter(member => member.roles.includes(ticker.platform_id)).length;
	},
});
