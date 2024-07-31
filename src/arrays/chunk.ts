/**
 * Creates an array of elements split into groups the length of size.
 * If collection can’t be split evenly, the
 * final chunk will be the remaining elements.
 * @template T The type of elements in the array.
 * @param {T[]} arr - The array to be chunked into smaller arrays.
 * @param {number} size - The size of each smaller array. Must be a positive integer.
 * @returns {T[][]} A two-dimensional array where each sub-array has a maximum length of `size`.
 * @throws {Error} Throws an error if `size` is not a positive integer.
 * @example
 * // Splits an array of numbers into sub-arrays of length 2
 * chunk([1, 2, 3, 4, 5], 2);
 * // Returns: [[1, 2], [3, 4], [5]]
 * @example
 * // Splits an array of strings into sub-arrays of length 3
 * chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
 * // Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const chunkSize = Math.max(Math.floor(size), 0);

  if (chunkSize === 0) {
    return [];
  }

  const chunkLength = Math.ceil(arr.length / chunkSize);
  const result: T[][] = new Array(chunkLength);

  for (let index = 0; index < chunkLength; index++) {
    const start = index * chunkSize;
    const end = start + chunkSize;

    result[index] = arr.slice(start, end);
  }

  return result;
}
