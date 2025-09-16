import { isBuffer } from '../is/is-buffer';
import { RE_FUNCTION_NAME } from '../regexp/function-name';
import { nativeClass } from './native-class';

const CONSTRUCTOR_NAME_MIN_LENGTH = 8;

/**
 * Determines the name of a value's constructor.
 * @param {*} value - input value
 * @returns {string} name of a value's constructor
 * @example
 * var v = constructorName( 'a' );
 * // returns 'String'
 * @example
 * var v = constructorName( 5 );
 * // returns 'Number'
 * @example
 * var v = constructorName( null );
 * // returns 'Null'
 * @example
 * var v = constructorName( undefined );
 * // returns 'Undefined'
 * @example
 * var v = constructorName( function noop() {} );
 * // returns 'Function'
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const constructorName = (value: any): string => {
  const name = nativeClass(value).slice(CONSTRUCTOR_NAME_MIN_LENGTH, -1);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((name === 'Object' || name === 'Error') && value.constructor) {
    const ctor = (value as Error).constructor;

    if (typeof ctor.name === 'string') {
      return ctor.name;
    }

    const match = RE_FUNCTION_NAME.exec(ctor.toString());

    if (match) {
      return match[1];
    }
  }

  if (isBuffer(value)) {
    return 'Buffer';
  }

  return name;
};
