type Cache<T> = { [key: string]: { exp: number | null; value: T } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoize = <TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => TResult,
  keyFunc: ((...args: TArgs) => string) | null,
  ttl: number | null,
) => {
  return function callWithMemo(...args: TArgs): TResult {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args });
    const existing = cache[key];

    if (existing !== undefined) {
      if (!existing.exp) return existing.value;

      if (existing.exp > Date.now()) {
        return existing.value;
      }
    }

    const result = func(...args);

    // eslint-disable-next-line no-param-reassign
    cache[key] = {
      exp: ttl ? Date.now() + ttl : null,
      value: result,
    };

    return result;
  };
};

/**
 * Creates a memoized function. The returned function
 * will only execute the source function when no value
 * has previously been computed. If a ttl (milliseconds)
 * is given previously computed values will be checked
 * for expiration before being returned.
 * @template TArgs
 * @template TResult
 * @param {(...args: TArgs) => TResult} func The function to memoize
 * @param {object} options Options
 * @param {(...args: TArgs) => string} options.key A function that returns a key for the cache
 * @param {number} options.ttl The time to live for the cache in milliseconds
 * @returns {(...args: TArgs) => TResult} A memoized function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memo = <TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult,
  options: {
    key?: (...args: TArgs) => string;
    ttl?: number;
  } = {},
) => {
  return memoize({}, func, options.key ?? null, options.ttl ?? null) as (
    ...args: TArgs
  ) => TResult;
};
