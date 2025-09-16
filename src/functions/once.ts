import type { FunctionLike } from '../types/primitive';

/**
 * Creates a function that is restricted to invoking the provided function `func` once.
 * Repeated calls to the function will return the value from the first invocation.
 * @template F - The type of function.
 * @param {F} func - The function to restrict.
 * @returns {F} A new function that invokes `func` once and caches the result.
 * @example
 * const initialize = once(() => {
 *   console.log('Initialized!');
 *   return true;
 * });
 *
 * initialize(); // Logs: 'Initialized!' and returns true
 * initialize(); // Returns true without logging
 */
export function once<F extends FunctionLike>(func: F): F {
  let called = false;
  let cache: ReturnType<F> | undefined;

  return ((): ReturnType<F> => {
    // biome-ignore lint/nursery/noUnnecessaryConditions: bool check
    if (called) {
      // biome-ignore lint/style/noNonNullAssertion: we make sure cache is defined
      return cache!;
    }

    const result = func() as ReturnType<F>;

    called = true;
    cache = result;

    return result;
  }) as F;
}
