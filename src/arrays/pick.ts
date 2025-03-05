/* eslint-disable sonarjs/pseudo-random */
/**
 * Get a random value with `Math.random()`
 * @template T
 * @param {T[]} array - The array from which to pick a random element.
 * @returns {T} A random element from the array.
 */
export const pick = <T>(array: readonly T[]): T =>
  array[Math.floor(Math.random() * array.length)];

/**
 * Returns a sample element array of a specified `size`.
 *
 * This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
 *
 * {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algoritm}
 * @template T
 * @param {T[]} array - The array from which to sample elements.
 * @param {number} size - The number of elements to sample.
 * @returns {T[]} An array containing the sampled elements.
 */
export const sample = <T>(array: readonly T[], size: number): T[] => {
  if (size > array.length) {
    return [...array];
  }

  const result: T[] = Array.from({ length: size });
  const selected = new Set();

  for (
    let resultIndex = 0, step = array.length - size;
    step < array.length;
    step++, resultIndex++
  ) {
    let index = Math.floor(Math.random() * (step + 1));

    if (selected.has(index)) {
      index = step;
    }

    selected.add(index);

    result[resultIndex] = array[index];
  }

  return result;
};
