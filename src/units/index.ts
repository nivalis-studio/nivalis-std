/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * convert bytes to kilobytes
 * @param {number} bytes - input value
 * @returns {number} converted value
 */
export const toKb = (bytes: number): number => Math.round(bytes / 1024);

/**
 * convert bytes to megabytes
 * @param {number} bytes - input value
 * @returns {number} converted value
 */
export const toMb = (bytes: number): number => Math.round(bytes / 1024 ** 2);

/**
 * convert bytes to gigabytes
 * @param {number} bytes - input value
 * @returns {number} converted value
 */
export const toGb = (bytes: number): number => Math.round(bytes / 1024 ** 3);

/**
 * convert bytes to Human bytes string
 * @param {number} bytes - input value
 * @param {number} precision - number of significant digits (must be between 1 and 21)
 * @param {string} separator - separator between value and readable unit
 * @returns {number} converted value
 */
export const toHumanBytes = (
  bytes = 0,
  precision = 3,
  separator = '',
): string => {
  if (bytes < 1024) {
    return `${Math.round(bytes)}${separator}byte(s)`;
  }

  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toPrecision(precision)}${separator}Kb`;
  }

  if (bytes < 1024 ** 3) {
    return `${(bytes / 1024 ** 2).toPrecision(precision)}${separator}Mb`;
  }

  if (bytes < 1024 ** 4) {
    return `${(bytes / 1024 ** 3).toPrecision(precision)}${separator}Gb`;
  }

  if (bytes < 1024 ** 5) {
    return `${(bytes / 1024 ** 4).toPrecision(precision)}${separator}Tb`;
  }

  return `${Math.round(bytes / 1024 ** 4)}${separator}Tb`;
};

/**
 * Helpful to print big numbers, as it adds `K` (kilo), `M` (mega), etc to make
 * them more readable.
 * @param {number} val - input value
 * @param {number} precision - number of significant digits (must be between 1 and 21)
 * @param {string} separator - separator between value and readable unit
 * @returns {string} converted value
 */
export const toHumanCount = (
  val = 0,
  precision = 3,
  separator = '',
): string => {
  if (val < 10 ** 4) {
    return String(val.toPrecision(precision));
  }

  if (val < 10 ** 6) {
    return `${(val / 10 ** 3).toPrecision(precision)}${separator}K`;
  }

  if (val < 10 ** 9) {
    return `${(val / 10 ** 6).toPrecision(precision)}${separator}M`; // million
  }

  if (val < 10 ** 12) {
    return `${(val / 10 ** 9).toPrecision(precision)}${separator}B`; // billion
  }

  if (val < 10 ** 15) {
    return `${(val / 10 ** 12).toPrecision(precision)}${separator}T`; // trillion
  }

  return `${Math.round(val / 10 ** 12)}${separator}T`;
};
