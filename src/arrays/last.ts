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
