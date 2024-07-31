/**
 * Capitalize the first letter of a string.
 * @param string
 */
export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);

/**
 * Capitalize the first letter of each word in a string.
 * @param string
 */
export const capitalizeWords = (string: string): string =>
  string.replaceAll(/(?:^|\s)\S/g, capitalize);
