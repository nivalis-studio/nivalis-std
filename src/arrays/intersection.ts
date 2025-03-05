import { MAX_ARRAY_OPTIMIZE_SIZE } from '../constants';

/**
 * Returns the intersection of two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements that are
 * present in both arrays. It effectively filters out any elements from the first array that
 * are not found in the second array.
 * @template T
 * @param {T[]} arrays - The arrays to intersect. Each array is compared to the other arrays
 * @returns {T[]} A new array containing the elements that are present in both arrays.
 */
export const intersection = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  const [firstArr, ...restArrays] = arrays;

  if (firstArr.length <= MAX_ARRAY_OPTIMIZE_SIZE) {
    return arrays.reduce(
      (prev, curr) => prev.filter(value => curr.includes(value)),
      [...firstArr],
    );
  }

  const restSet = new Set(...restArrays);

  return firstArr.filter(item => restSet.has(item));
};
