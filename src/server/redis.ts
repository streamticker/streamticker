import {Redis} from '@upstash/redis';
import {env} from './env';

export const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});

export interface Cache<T> {
	get(): Promise<T>;
	set(value: T): Promise<void>;
	refetch(): Promise<T>;
}

export const CACHE_ERROR: unique symbol = Symbol('errored');

export async function cache<T>(methods: Cache<T>) {
	const cached = await methods.get().catch(() => CACHE_ERROR);

	if (cached !== CACHE_ERROR) {
		return cached as T;
	}

	const recent = await methods.refetch();

	if (recent) {
		await methods.set(recent);
	}

	return recent;
}

export function createCache<T>(methods: Cache<T>) {
	return async () => cache(methods);
}

export async function wrapRedis<T>(key: string, fn: () => Promise<T>, seconds = 60) {
	return cache<T>({
		refetch: fn,
		async get() {
			const value = await redis.get<T>(key);

			if (!value) {
				throw new Error('Cache miss');
			}

			return value;
		},
		async set(value) {
			await redis.set(key, value, {ex: seconds});
		},
	});
}
