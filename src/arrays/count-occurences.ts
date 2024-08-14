/**
 * Counts the occurrences of a value in an array.
 * @template T - The type of values in the array.
 * @param {T[]} array - An array of values to count occurrences in.
 * @param {T} value - The value to count occurrences of.
 * @returns {number} The number of occurrences of the value in the array.
 * @example
 * const array = [1, 2, 3, 1];
 * const value = 1;
 * const result = countOccurrences(array, value);
 * // result will be 2
 */
export const countOccurrences = <T>(array: T[], value: T): number =>
  array.reduce(
    (previous, current) => (current === value ? previous + 1 : previous),
    0,
  );
