/**
 * Creates a function that only executes starting from the `n`-th call.
 * The provided function will be invoked starting from the `n`-th call.
 *
 * This is particularly useful for scenarios involving events or asynchronous operations
 * where an action should occur only after a certain number of invocations.
 * @template F - The type of the function to be invoked.
 * @param {number} n - The number of calls required for `func` to execute.
 * @param {F} func - The function to be invoked.
 * @returns {(...args: Parameters<F>) => ReturnType<F> | undefined} - A new function that:
 * - Tracks the number of calls.
 * - Invokes `func` starting from the `n`-th call.
 * - Returns `undefined` if fewer than `n` calls have been made.
 * @throws {Error} - Throws an error if `n` is negative.
 * @example
 *
 * const afterFn = after(3, () => {
 *  console.log("called")
 * });
 *
 * // Will not log anything.
 * afterFn()
 * // Will not log anything.
 * afterFn()
 * // Will log 'called'.
 * afterFn()
 */

import type { FunctionLike } from '../types/primitive';

export function after<F extends FunctionLike>(
  num: number,
  func: F,
): (...args: Parameters<F>) => ReturnType<F> | undefined {
  if (!Number.isInteger(num) || num < 0) {
    throw new Error('n must be a non-negative integer.');
  }

  let counter = 0;

  return (...args: Parameters<F>) => {
    // eslint-disable-next-line no-plusplus
    if (++counter >= num) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return func(...args);
    }
  };
}
