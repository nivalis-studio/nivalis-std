/**
 * Returns the intersection of two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements that are
 * present in both arrays. It effectively filters out any elements from the first array that
 * are not found in the second array.
 * @param {...any} arrays
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }

  const [firstArr, ...restArrays] = arrays;

  if (firstArr.length <= 100) {
    return arrays.reduce((a, b) => a.filter(v => b.includes(v)));
  }

  const restSet = new Set(...restArrays);

  return firstArr.filter(item => restSet.has(item));
}
