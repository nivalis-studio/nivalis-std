export const squared = (x: number) => x * x;
export const hav = (x: number) => squared(Math.sin(x / 2));
export const toRad = (x: number) => (x * Math.PI) / 180;

/**
 * Round a number to a chosen precision.
 * @param number
 * @param precision
 * @returns rounded number
 */
export const roundNumber = (number: number, precision: number): number => {
	const factor = 10 ** precision;
	return Math.round(number * factor) / factor;
};
