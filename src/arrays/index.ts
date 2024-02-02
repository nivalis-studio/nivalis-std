/**
 * Returns the average of an array.
 */
export const average = (array: number[]) =>
	[...array].reduce((acc, value) => acc + value, 0) / array.length;

/**
 * Counts the occurrences of a value in an array.
 */
export const countOccurrences = <T>(array: T[], value: T) =>
	array.reduce((a, v) => (v === value ? a + 1 : a), 0);

/**
 * Remove duplicate items from an array.
 */
export const unDuplicate = <T>(array: T[]) => [...new Set(array)];

/**
 * Gets the index of the last element.
 */
export const lastIndex = <T>(array: T[]): number => array.length - 1;

/**
 * Gets the last element of an array.
 */
export const last = <T>(array: T[]): T | undefined => {
	const length = array === null ? 0 : array.length;
	return length ? array[length - 1] : undefined;
};

/**
 * Remove an item of an array.
 */
export const remove = <T>(array: T[], element: T): T[] => {
	const array_ = [...array];
	const idx = array_.indexOf(element);

	if (idx < 0) {
		return [];
	}

	array_.splice(idx, 1);
	return array_;
};

/**
 * Get a random index with `Math.random()`
 * @param array
 * @returns
 */
export const randomIndex = <T>(array: readonly T[]) => {
	return Math.floor(Math.random() * array.length);
};

/**
 * Get a random value with `Math.random()`
 * @param array
 * @returns
 */
export const pick = <T>(array: readonly T[]) => {
	if (array.length === 0) {
		return undefined;
	}

	return array[randomIndex(array)];
};

/**
 * Randomly shuffle an array.
 * Fisher–Yates algorithm.
 * Based on: https://stackoverflow.com/a/12646864/4919972
 *
 * @return Returns the new shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] => {
	const a = [...array];

	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j] as T, a[i] as T];
	}

	return a;
};

export const sortNumbers = (array: number[], dir = 'asc' as 'asc' | 'desc') =>
	[...array].sort((a, b) => (a - b) * (dir === 'desc' ? -1 : 1));

/**
 * Creates an array of elements split into groups the length of size. If collection can’t be split evenly, the
 * final chunk will be the remaining elements.
 *
 * @param array The array to process.
 * @param size The length of each chunk.
 * @return Returns the new array containing chunks.
 *
 * Based on: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
 */
export const chunk = <T>(array: readonly T[], size = 1): T[][] => {
	const chunkedArray: T[][] = [];
	let currentChunk: T[] = [];

	for (const item of array) {
		currentChunk.push(item);
		if (currentChunk.length === size) {
			chunkedArray.push(currentChunk);
			currentChunk = [];
		}
	}

	if (currentChunk.length) {
		chunkedArray.push(currentChunk);
	}

	return chunkedArray;
};

/**
 * @example
 * intersection([2, 1], [2, 3])
 * // [2]
 */
export const intersection = <T>(...arrays: T[][]): T[] =>
	arrays.length === 0
		? []
		: arrays.reduce((a, b) => a.filter((v) => b.includes(v)));

/**
 * @example
 * difference([2, 1], [2, 3])
 * // [1]
 */
export const difference = <T>(source: T[], ...diffs: T[][]): T[] =>
	diffs.reduce((a, b) => a.filter((c) => !b.includes(c)), source);

export const ensureIsArray = <T>(value: T | T[]): T[] =>
	Array.isArray(value) ? value : [value];
