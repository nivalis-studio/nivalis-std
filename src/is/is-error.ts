import { nativeClass } from '../objects/native-class';

/**
 * Tests if a value is an `Error` object.
 * @param {*} value - value to test
 * @returns {boolean} boolean indicating whether a value is an `Error` object
 * @example
 * var bool = isError( new Error( 'beep' ) );
 * // returns true
 * @example
 * var bool = isError( {} );
 * // returns false
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isError = (value: any): value is Error => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
  if (value instanceof Error) {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let val = value;

  // Walk the prototype tree until we find an object having the desired native class...
  while (val) {
    if (nativeClass(val) === '[object Error]') {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    val = Object.getPrototypeOf(val);
  }

  return false;
};
