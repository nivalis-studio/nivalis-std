/**
 * Returns the average of an array.
 */
export const average = (array: number[]) =>
	[...array].reduce((acc, value) => acc + value, 0) / array.length;
