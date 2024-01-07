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
export const random = <T>(array: readonly T[]) => {
	if (array.length === 0) {
		return undefined;
	}

	return array[randomIndex(array)];
};

/**
 * Randomly shuffle an array.
 * https://stackoverflow.com/a/2450976/1293256
 */
export const shuffle = <T>(array: T[]): T[] => {
	let currentIndex = array.length;
	let temporaryValue: T;
	let randomIndex: number;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};
