/**
 * Round a number to a chosen precision.
 * @param {number} x - input value
 * @param {number} precision
 * @returns rounded number
 */
export const round = (x: number, precision: number): number => {
  const factor = 10 ** precision;

  return Math.round(x * factor) / factor;
};
