/**
 * Gathers elements in the same position in an internal array
 * from a grouped array of elements and returns them as a new array.
 * @template T - The type of elements in the nested array.
 * @param {Array<[...T]>} zipped - The nested array to unzip.
 * @returns {Unzip<T>} A new array of unzipped elements.
 * @example
 * const zipped = [['a', true, 1],['b', false, 2]];
 * const result = unzip(zipped);
 * // result will be [['a', 'b'], [true, false], [1, 2]]
 */
export function unzip<T extends unknown[]>(
  zipped: ReadonlyArray<[...T]>,
): Unzip<T> {
  // For performance reasons, use this implementation instead of
  // const maxLen = Math.max(...zipped.map(arr => arr.length));
  let maxLen = 0;

  for (const element of zipped) {
    if (element.length > maxLen) {
      maxLen = element.length;
    }
  }

  const result = new Array(maxLen) as Unzip<T>;

  for (let i = 0; i < maxLen; i++) {
    result[i] = Array.from({ length: zipped.length });

    for (const [j, element] of zipped.entries()) {
      result[i][j] = element[i];
    }
  }

  return result;
}

type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
