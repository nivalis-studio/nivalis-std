import { isFunction } from '../is';

/**
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 * @template T - The type of the values in the range
 * @param {number} startOrLength - The start of the range or the length of the range
 * @param {number} [end] - The end of the range
 * @param {T | ((i: number) => T)} [valueOrMapper] - The value or mapper function
 * @param {number} [step] - The step of the range
 * @yields {Generator<T>} A generator that produces the range of numbers
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step: number = 1,
): Generator<T> {
  const mapper = isFunction(valueOrMapper)
    ? valueOrMapper
    : () => valueOrMapper;
  const start = end ? startOrLength : 0;
  const final = end ?? startOrLength;

  for (let i = start; i <= final; i += step) {
    yield mapper(i);

    if (i + step > final) break;
  }
}
