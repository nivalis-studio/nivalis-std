/**
 * Remove duplicate items from an array.
 * @template T
 * @param {T[]} array - The array to remove duplicates from.
 * @returns {T[]} A new array with duplicate items removed.
 * @example
 * const array = [1, 2, 3, 3];
 * const result = unDuplicate(array);
 * // result will be [1, 2, 3]
 */
export const unDuplicate = <T>(array: T[]): T[] => [...new Set(array)];
