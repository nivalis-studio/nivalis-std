/**
 * Creates a throttled function that only invokes the provided function at most once
 * per every `throttleMs` milliseconds. Subsequent calls to the throttled function
 * within the wait time will not trigger the execution of the original function.
 * @template F - The type of function.
 * @param {F} func - The function to throttle.
 * @param {number} throttleMs - The number of milliseconds to throttle executions to.
 * @returns {F} A new throttled function that accepts the same parameters as the original function.
 * @example
 * const throttledFunction = throttle(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * // Will log 'Function executed' immediately
 * throttledFunction();
 *
 * // Will not log anything as it is within the throttle time
 * throttledFunction();
 *
 * // After 1 second
 * setTimeout(() => {
 *   throttledFunction(); // Will log 'Function executed'
 * }, 1000);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  throttleMs: number,
): F {
  let lastCallTime: number | null;

  const throttledFunction = ((...args: Parameters<F>) => {
    const now = Date.now();

    if (
      lastCallTime === undefined ||
      lastCallTime === null ||
      now - lastCallTime >= throttleMs
    ) {
      lastCallTime = now;
      func(...args);
    }
  }) as F;

  return throttledFunction;
}
