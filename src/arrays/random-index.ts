/**
 * Get a random index with `Math.random()`
 * @template T
 * @param {T[]} array - The array from which to get a random index.
 * @returns {number} A random index in the array.
 */
export const randomIndex = <T>(array: readonly T[]): number =>
  Math.floor(Math.random() * array.length);
