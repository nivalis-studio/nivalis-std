/**
 * Select performs a filter and a mapper inside of a reduce,
 * only iterating the list one time.
 * @template T
 * @template K
 * @param {T[]} array - The array to select from.
 * @param {(item: T, index: number) => K} mapper - The mapper function.
 * @param {(item: T, index: number) => boolean} condition - The condition function.
 * @returns {K[]} The selected items.
 * @example
 * select([1, 2, 3, 4], x => x*x, x > 2) == [9, 16]
 */
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T, index: number) => K,
  condition: (item: T, index: number) => boolean,
) => {
  if (!array) return [];

  return array.reduce<K[]>((acc, item, index) => {
    if (!condition(item, index)) return acc;
    acc.push(mapper(item, index));

    return acc;
  }, []);
};
