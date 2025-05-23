/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param {T} obj - The object to pick keys from.
 * @param {K[]} keys - An array of keys to be picked from the object.
 * @returns {Pick<T, K>} A new object with the specified keys picked.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pick<T extends { [key: string]: any }, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as unknown as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}
