import {TickerType} from '@prisma/client';

interface Harvester {}

export const harvesters: Record<TickerType, Harvester> = {
	YOUTUBE_SUBSCRIBERS: {},
};
