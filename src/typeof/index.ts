import {constructorName} from '../constructor-name';

/**
 * Determines a value's type.
 *
 * @param {*} value - input value
 * @returns {string} string indicating the value's type
 */

// biome-ignore lint/suspicious/noExplicitAny: we want to allow any value
export const typeOf = (value: any): string => {
	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if (value === null) {
		return 'null';
	}

	const type = typeof value;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if (type === 'object') {
		return constructorName(value).toLowerCase();
	}

	return type;
};
