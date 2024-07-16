/**
 * @example
 * intersection([2, 1], [2, 3])
 * // [2]
 */
export const intersection = <T>(...arrays: T[][]): T[] =>
	arrays.length === 0
		? []
		: arrays.reduce((a, b) => a.filter((v) => b.includes(v)));
