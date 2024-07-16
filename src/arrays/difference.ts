/**
 * @example
 * difference([2, 1], [2, 3])
 * // [1]
 */
export const difference = <T>(source: T[], ...diffs: T[][]): T[] =>
	diffs.reduce((a, b) => a.filter((c) => !b.includes(c)), source);
