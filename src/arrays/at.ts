/**
 * Retrieves elements from an array at the specified indices.
 *
 * This function supports negative indices, which count from the end of the array.
 * @template T
 * @param {T[]} arr - The array to retrieve elements from.
 * @param {number[]} indices - An array of indices specifying the positions of elements to retrieve.
 * @returns {T[]} A new array containing the elements at the specified indices.
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const result = at(numbers, [1, 3, 4]);
 * console.log(result); // [20, 40, 50]
 */
export function at<T>(arr: readonly T[], indices: number[]): T[] {
  const result: T[] = Array.from({ length: indices.length });
  const length = arr.length;

  for (const [i, index] of indices.entries()) {
    let index_ = Number.isInteger(index) ? index : Math.trunc(index) || 0;

    if (index < 0) {
      index_ += length;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result[i] = arr[index_]!;
  }

  return result;
}
