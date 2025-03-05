/**
 * Get a random index with `Math.random()`
 * @template T
 * @param {T[]} array - The array from which to get a random index.
 * @returns {number} A random index in the array.
 */
export const randomIndex = <T>(array: readonly T[]): number =>
  // eslint-disable-next-line sonarjs/pseudo-random
  Math.floor(Math.random() * array.length);
