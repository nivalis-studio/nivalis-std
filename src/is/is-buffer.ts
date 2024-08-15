/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { isObjectLike } from './is-object-like';

/**
 * Tests if a value is a Buffer instance.
 * @param {*} value - value to validate
 * @returns {boolean} boolean indicating if a value is a Buffer instance
 * @example
 * var v = isBuffer( new Buffer( 'beep' ) );
 * // returns true
 * @example
 * var v = isBuffer( {} );
 * // returns false
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBuffer = (value: any): value is Buffer =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  isObjectLike(value) &&
  (value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
    (value.constructor &&
      // WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
      typeof value.constructor.isBuffer === 'function' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      value.constructor.isBuffer(value)));
