import { CONST_180_DIV_PI, PI_DIV_180 } from '../constants';

/**
 * Computes the half-value versed sine.
 * @param {number} x - input value (in radians)
 * @returns {number} half-value versed sine
 * @example
 * var v = haversin( 3.141592653589793/2.0 );
 * // returns ~0.5
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const haversin = (x: number): number => (1 - Math.cos(x)) / 2;

/**
 * Computes the half-value versed cosine.
 * @param {number} x - input value (in radians)
 * @returns {number} half-value versed cosine
 * @example
 * var v = havercos( 3.141592653589793/2.0 );
 * // returns 0.5
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const havercos = (x: number): number => (1 + Math.cos(x)) / 2;

/**
 * Converts an angle from degrees to radians.
 * @param {number} x - angle in degrees
 * @returns {number} angle in radians
 * @example
 * var r = deg2rad( 90.0 );
 * // returns ~1.571
 * @example
 * var r = deg2rad( -45.0 );
 * // returns ~-0.785
 */
export const deg2rad = (x: number): number => x * PI_DIV_180;

/**
 * Converts an angle from radians to degrees.
 * @param {number} x - angle in radians
 * @returns {number} angle in degrees
 * @example
 * var d = rad2deg( 3.141592653589793/2.0 );
 * // returns 90.0
 * @example
 * var d = rad2deg( -3.141592653589793/4.0 );
 * // returns -45.0
 */
export const rad2deg = (x: number): number => x * CONST_180_DIV_PI;

/**
 * Computes the absolute value of `x`.
 * @param {number} x - input value
 * @returns {number} absolute value
 * @example
 * var v = abs( -1.0 );
 * // returns 1.0
 * @example
 * var v = abs( 2.0 );
 * // returns 2.0
 */
export const abs = (x: number): number => (x < 0 ? -x : x);

export { clamp } from './clamp';
export { round } from './round';
export { sum } from './sum';
export { mean } from './mean';
