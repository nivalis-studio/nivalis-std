import { isPlainObject } from '../predicate/isPlainObject.ts';

type FlattenObjectOptions = {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
};

/**
 * Flattens a nested object into a single level object with delimiter-separated keys.
 * @param {object} object - The object to flatten.
 * @param {string} [options.delimiter] - The delimiter to use between nested keys.
 * @param root0
 * @param root0.delimiter
 * @returns {Record<string, any>} - The flattened object.
 * @example
 * const nestedObject = {
 *   a: {
 *     b: {
 *       c: 1
 *     }
 *   },
 *   d: [2, 3]
 * };
 *
 * const flattened = flattenObject(nestedObject);
 * console.log(flattened);
 * // Output:
 * // {
 * //   'a.b.c': 1,
 * //   'd.0': 2,
 * //   'd.1': 3
 * // }
 */
export function flattenObject(
  object: object,
  { delimiter = '.' }: FlattenObjectOptions = {},
): { [key: string]: any } {
  return flattenObjectImpl(object, '', delimiter);
}

function flattenObjectImpl(
  object: object,
  prefix = '',
  delimiter = '.',
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  const keys = Object.keys(object);

  for (const key of keys) {
    const value = (object as any)[key];

    const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));

      continue;
    }

    if (Array.isArray(value)) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));

      continue;
    }

    result[prefixedKey] = value;
  }

  return result;
}
