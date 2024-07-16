/**
 * Filter elements that are null or undefined.
 * @param value
 * @returns {boolean} true if value is not null or undefined
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> =>
	value !== null && value !== undefined;
