import { randomIndex } from './random-index';

/**
 * Get a random value with `Math.random()`
 * @param array
 * @returns
 */
export const pick = <T>(array: readonly T[]) =>
	array.length === 0 ? undefined : array[randomIndex(array)];
