/**
 * Get a random index with `Math.random()`
 * @param array
 * @returns
 */
export const randomIndex = <T>(array: readonly T[]) =>
	Math.floor(Math.random() * array.length);
