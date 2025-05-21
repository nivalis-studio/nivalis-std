import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isString } from '../predicate/isString.ts';
import { get } from './get.ts';

/**
 * Returns an array of values corresponding to `paths` of `object`.
 * @template T - The type of the object.
 * @param {T} object - The object to iterate over.
 * @param {...(PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>)} [paths] - The property paths to pick.
 * @returns {Array<unknown>} - Returns the picked values.
 * @example
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * at(object, ['a[0].b.c', 'a[1]']);
 * // => [3, 4]
 * ```
 */
export function at<T>(
  object: T,
  ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>
): unknown[] {
  if (paths.length === 0) {
    return [];
  }

  const allPaths: PropertyKey[] = [];

  for (const path of paths) {
    if (!isArrayLike(path) || isString(path)) {
      allPaths.push(path);

      continue;
    }

    for (const element of path) {
      allPaths.push(element);
    }
  }

  const result: unknown[] = [];

  for (const allPath of allPaths) {
    result.push(get(object, allPath));
  }

  return result;
}
