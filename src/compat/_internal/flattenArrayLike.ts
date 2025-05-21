import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

export function flattenArrayLike<T>(
  values: Array<ArrayLike<T> | unknown>,
): T[] {
  const result: T[] = [];

  for (const arrayLike of values) {
    if (!isArrayLikeObject(arrayLike)) {
      continue;
    }

    for (const element of arrayLike) {
      result.push(element as T);
    }
  }

  return result;
}
