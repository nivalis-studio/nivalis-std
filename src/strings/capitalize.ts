/**
 * Capitalize the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The capitalized string.
 * @example
 * capitalize('hello'); // "Hello"
 */
export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The capitalized string.
 * @example
 * capitalizeWords('hello world'); // "Hello World"
 */
export const capitalizeWords = (string: string): string =>
  string.replaceAll(/(?:^|\s)\S/g, capitalize);
