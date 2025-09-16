/**
 * Round a number to a chosen precision.
 * @param {number} x - input value
 * @param {number} precision - precision
 * @returns {number} rounded number
 */
export const round = (x: number, precision = 0): number => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const factor = 10 ** precision;

  return Math.round(x * factor) / factor;
};
