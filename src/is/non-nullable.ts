/**
 * Filter elements that are null or undefined.
 * @template T - The type of the value
 * @param {T} value - The value to filter
 * @returns {value is NonNullable<T>} true if value is not null or undefined
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;
