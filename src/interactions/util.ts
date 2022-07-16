export type Mirror<T extends string = string> = {
	[Key in T]: Key;
};

export type Primitive = string | number | boolean | null | undefined;

/**
 * Checks if a value exists in an array in a type safe manner
 * @param value Value to check
 * @param arr An array of possible matches
 * @returns A boolean indicating if a passed value is one of the items in the array
 */
export function is<V extends Primitive, Arr extends readonly [V, ...V[]]>(
	value: unknown,
	arr: Arr
): value is Arr[number] {
	return arr.includes(value as V);
}

export function enumerate<T extends string>(values: Mirror<T>) {
	return Object.values(values) as [T, ...T[]];
}

export type Without<T, U> = {[P in Exclude<keyof T, keyof U>]?: never};
export type XOR<T, U> = T | U extends Record<string, unknown>
	? (Without<T, U> & U) | (Without<U, T> & T)
	: T | U;
