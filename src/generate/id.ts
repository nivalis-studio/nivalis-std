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
    // eslint-disable-next-line unicorn/prefer-math-trunc, no-bitwise, sonarjs/pseudo-random
    code += alphabet[(Math.random() * alphabet.length) | 0];
  }

  return code;
};
