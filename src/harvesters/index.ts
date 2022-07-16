import {TickerType} from '@prisma/client';
import {Client} from 'discord.js';

function create<T extends Record<TickerType, (client: Client<true>) => AbstractHarvester>>(
	data: T
) {
	return (client: Client<true>) => {
		const result: Partial<Record<TickerType, AbstractHarvester>> = {};

		for (const [type, get] of Object.entries(data)) {
			result[type as TickerType] = get?.(client);
		}

		return result as Record<TickerType, AbstractHarvester>;
	};
}

export const harvesters: Record<TickerType, Harvester> = {
	YOUTUBE_SUBSCRIBERS: {},
};
