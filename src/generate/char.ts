import { generateId } from './id';

/**
 * Get a random char ex: 3N4J8A
 * @param {number} len Number of char (default 6)
 * @returns {string} value
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const generateRandomChar = (len = 6): string =>
  generateId(len, '123456789ACEFHJKLMNPRTUVWXY');
