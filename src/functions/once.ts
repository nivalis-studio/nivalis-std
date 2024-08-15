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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function once<F extends () => any>(func: F): F {
  let called = false;
  let cache: ReturnType<F> | undefined;

  return ((): ReturnType<F> => {
    if (called) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-non-null-assertion
      return cache!;
    }

    const result = func() as ReturnType<F>;

    called = true;
    cache = result;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }) as F;
}
