/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys.
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param {T} obj - The object to omit keys from.
 * @param {K[]} keys - An array of keys to be omitted from the object.
 * @returns {Omit<T, K>} A new object with the specified keys omitted.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, ['b', 'c']);
 * // result will be { a: 1 }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omit<T extends { [key: string]: any }, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = structuredClone(obj);

  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete result[key];
  }

  return result as Omit<T, K>;
}
