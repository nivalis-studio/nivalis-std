/**
 * Gets the index of the last element.
 * @template T
 * @param {T[]} array - The array from which to get the last index.
 * @returns {number} The index of the last element in the array.
 */
export const lastIndex = <T>(array: T[]): number => array.length - 1;

/**
 * Returns the last element of an array.
 *
 * This function takes an array and returns the last element of the array.
 * If the array is empty, the function returns `undefined`.
 *
 * Unlike some implementations, this function is optimized for performance
 * by directly accessing the last index of the array.
 * @template T
 * @param {T[]} arr - The array from which to get the last element.
 * @returns {T | undefined} The last element of the array, or `undefined` if the array is empty.
 * @example
 * const arr = [1, 2, 3];
 * const lastElement = last(arr);
 * // lastElement will be 3
 *
 * const emptyArr: number[] = [];
 * const noElement = last(emptyArr);
 * // noElement will be undefined
 */

export function last<T>(arr: readonly [...T[], T]): T;
export function last<T>(arr: readonly T[]): T | undefined;
export function last<T>(arr: readonly T[]): T | undefined {
  return arr.at(-1);
}
