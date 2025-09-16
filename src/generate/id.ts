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

  while (idx--) {
    // biome-ignore lint/suspicious/noBitwiseOperators: custom case
    code += alphabet[(Math.random() * alphabet.length) | 0];
  }

  return code;
};
