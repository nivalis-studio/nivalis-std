import { union } from '../arrays/union';

/**
 * Checks if two values are equal, including support for `Date`, `RegExp`, and deep object comparison.
 * @param {unknown} a - The first value to compare.
 * @param {unknown} b - The second value to compare.
 * @returns {boolean} `true` if the values are equal, otherwise `false`.
 * @example
 * isEqual(1, 1); // true
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual(/abc/g, /abc/g); // true
 * isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
 * isEqual([1, 2, 3], [1, 2, 3]); // true
 */

export function isEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // check if all keys in both arrays match
  if (union(aKeys, bKeys).length !== aKeys.length) {
    return false;
  }

  for (const propKey of aKeys) {
    const aProp = (a as { [key: string]: unknown })[propKey];
    const bProp = (b as { [key: string]: unknown })[propKey];

    if (!isEqual(aProp, bProp)) {
      return false;
    }
  }

  return true;
}
