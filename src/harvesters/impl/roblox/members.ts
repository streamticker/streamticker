import {TickerType} from '@prisma/client';
import {createHarvester, HarvesterUtils, TickerRequirement} from '../../harvester';
import {RobloxAPI} from './api';

export const ROBLOX_GROUP_MEMBERS = createHarvester(TickerType.ROBLOX_GROUP_MEMBERS, {
	requirement: TickerRequirement.VOTE,
	async validateInput(id) {
		if (!id) {
			return {
				success: false,
				message: 'Invalid format! Expected `id`',
			};
		}

		const body = await RobloxAPI.getGroup(id).catch(() => null);

		if (!body) {
			return {
				success: false,
				message: 'Roblox group does not exist',
			};
		}

		return {
			success: true,
			platform_id: id,
		};
	},
	async harvest(ticker, utils: HarvesterUtils) {
		utils.ensureId(ticker);

		const memberCount = await RobloxAPI.getGroupMembership(ticker.platform_id);

		return memberCount;
	},
});
