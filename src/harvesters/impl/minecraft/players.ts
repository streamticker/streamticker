import {TickerType} from '@prisma/client';
import type {HarvesterUtils} from '../../harvester';
import {createHarvester, TickerRequirement} from '../../harvester';
import {MinecraftAPI} from './api';

export const MINECRAFT_SERVER_PLAYERS_ONLINE = createHarvester(
	TickerType.MINECRAFT_SERVER_PLAYERS_ONLINE,
	{
		requirement: TickerRequirement.VOTE,
		async validateInput(address) {
			if (!address) {
				return {
					success: false,
					message: 'Invalid format! Expected Minecraft server address.',
				};
			}

			const server = await MinecraftAPI.getServer(address).catch(() => null);

			if (!server?.debug.ping) {
				return {
					success: false,
					message: 'Minecraft server not found.',
				};
			}

			return {
				success: true,
				platform_id: address,
			};
		},
		async harvest(ticker, utils: HarvesterUtils) {
			utils.ensureId(ticker);

			const server = await MinecraftAPI.getServer(ticker.platform_id);

			return server.players.online;
		},
	}
);
