/* eslint-disable @typescript-eslint/no-magic-numbers */
const URL_ALPHABET =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/**
 * Get a random id ex: 3n4j8a9j3n4j8a9j3n4j8a9j
 * @param {number} size Number of char (default 21)
 * @param {string} alphabet The alphabet to use (default urlAlphabet)
 * @returns {string} value
 */
export const generateId = (
  size = 21,
  alphabet: string = URL_ALPHABET,
): string => {
  let code = '';
  let idx = size;

  // eslint-disable-next-line no-plusplus
  while (idx--) {
    // eslint-disable-next-line unicorn/prefer-math-trunc
    code += alphabet[(Math.random() * alphabet.length) | 0];
  }

  return code;
};

/**
 * Get a random char ex: 3N4J8A
 * @param {number} len Number of char (default 6)
 * @returns {string} value
 */
export const generateRandomChar = (len = 6): string =>
  generateId(len, '123456789ACEFHJKLMNPRTUVWXY');

/**
 * Get a random ex: 637283
 * @param {number} len Number of digits (default 6)
 * @returns {string} value
 */
export const generateRandomNumber = (len = 6): string =>
  (Math.floor(Math.random() * (9 * (10 ^ len))) + 1 * (10 ^ len)).toString();
