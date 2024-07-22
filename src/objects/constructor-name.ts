import { isBuffer } from '../is';
import { RE_FUNCTION_NAME } from '../regexp';
import { nativeClass } from './native-class';

/**
 * Determines the name of a value's constructor.
 *
 * @param {*} value - input value
 * @returns {string} name of a value's constructor
 *
 * @example
 * var v = constructorName( 'a' );
 * // returns 'String'
 *
 * @example
 * var v = constructorName( 5 );
 * // returns 'Number'
 *
 * @example
 * var v = constructorName( null );
 * // returns 'Null'
 *
 * @example
 * var v = constructorName( undefined );
 * // returns 'Undefined'
 *
 * @example
 * var v = constructorName( function noop() {} );
 * // returns 'Function'
 */

// biome-ignore lint/suspicious/noExplicitAny: we want to allow any here
export const constructorName = (value: any): string => {
	const name = nativeClass(value).slice(8, -1);

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
