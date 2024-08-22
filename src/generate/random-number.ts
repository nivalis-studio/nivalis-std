/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * Get a random number string with the specified number of digits, e.g., "637283"
 * @param {number} len Number of digits (default 6)
 * @returns {string} value
 */
export const generateRandomNumber = (len = 6): string => {
  const min = 10 ** (len - 1);
  const max = 10 ** len - 1;

  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
