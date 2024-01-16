/**
 * Tests if a value is object-like.
 *
 * @param {*} value - value to test
 * @returns {boolean} boolean indicating whether a value is object-like
 *
 * @example
 * var bool = isObjectLike( {} );
 * // returns true
 *
 * @example
 * var bool = isObjectLike( [] );
 * // returns true
 *
 * @example
 * var bool = isObjectLike( null );
 * // returns false
 */

// biome-ignore lint/suspicious/noExplicitAny: we want to allow any here
export const isObjectLike = (value: any): boolean =>
	value !== null && typeof value === 'object';
