import {constructorName} from '../constructor-name';

const CTORS = [
	[TypeError, 'TypeError'],
	[SyntaxError, 'SyntaxError'],
	[ReferenceError, 'ReferenceError'],
	[RangeError, 'RangeError'],
	[URIError, 'URIError'],
	[EvalError, 'EvalError'],
	[Error, 'Error'],
] as const;

/**
 * Returns the error type.
 *
 * @private
 * @param {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error - input error
 * @returns {(string|void)} error type
 *
 * @example
 * var err = new TypeError();
 * var out = typeName( err );
 * // returns 'TypeError'
 */

// biome-ignore lint/suspicious/noExplicitAny: we want to allow any value
export const typeName = (error: any) => {
	// Check for error objects from the same realm (same Node.js `vm` or same `Window` object)...
	for (let i = 0; i < CTORS.length; i++) {
		if (error instanceof CTORS[i][0]) {
			return CTORS[i][1];
		}
	}

	let tmp = error;

	// Walk the prototype tree until we find an object having a desired native class...
	while (tmp) {
		const v = constructorName(tmp);
		for (let i = 0; i < CTORS.length; i++) {
			if (v === CTORS[i][1]) {
				return CTORS[i][1];
			}
		}
		tmp = Object.getPrototypeOf(tmp);
	}
};
