/**
 * @template T
 * @param {T | T[]} value - The value to check
 * @returns {T[]} An array containing the input value if it is not an array, or the original array if it is an array.
 * @example
 * ensureIsArray(1) // [1]
 */
export const ensureIsArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];
