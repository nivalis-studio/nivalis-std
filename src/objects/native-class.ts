/**
 * Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
 * @param {*} value - input value
 * @returns {string} string value indicating a specification defined classification of the input value
 * @example
 * var str = nativeClass( 'a' );
 * // returns '[object String]'
 * @example
 * var str = nativeClass( 5 );
 * // returns '[object Number]'
 * @example
 * function Beep() {
 *     return this;
 * }
 * var str = nativeClass( new Beep() );
 * // returns '[object Object]'
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nativeClass = (value: any): string =>
  Object.prototype.toString.call(value);
