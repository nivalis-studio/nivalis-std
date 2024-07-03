import { isBuffer } from '../is';
import { nativeClass } from '../native-class';
import { RE_FUNCTION_NAME } from '../regexp';

/**
 * Determines the name of a value's constructor.
 *
 * @param {*} v - input value
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
export const constructorName = (v: any): string => {
	const name = nativeClass(v).slice(8, -1);

	if ((name === 'Object' || name === 'Error') && v.constructor) {
		const ctor = v.constructor;
		if (typeof ctor.name === 'string') {
			return ctor.name;
		}

		const match = RE_FUNCTION_NAME.exec(ctor.toString());
		if (match) {
			return match[1];
		}
	}

	if (isBuffer(v)) {
		return 'Buffer';
	}

	return name;
};
