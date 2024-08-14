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
 * @returns {number} converted value
 */
export const toHumanBytes = (bytes = 0): string => {
  if (bytes < 1024) {
    return `${Math.round(bytes)} byte(s)`;
  }

  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toPrecision(3)} Kb`;
  }

  if (bytes < 1024 ** 3) {
    return `${(bytes / 1024 ** 2).toPrecision(3)} Mb`;
  }

  if (bytes < 1024 ** 4) {
    return `${(bytes / 1024 ** 3).toPrecision(3)} Gb`;
  }

  if (bytes < 1024 ** 5) {
    return `${(bytes / 1024 ** 4).toPrecision(3)} Tb`;
  }

  return `${Math.round(bytes / 1024 ** 4)} Tb`;
};

/**
 * Helpful to print big numbers, as it adds `K` (kilo), `M` (mega), etc to make
 * them more readable.
 * @param {number} val - input value
 * @returns {string} converted value
 */
export const toHumanCount = (val = 0): string => {
  if (val < 10 ** 4) {
    return String(val);
  }

  if (val < 10 ** 6) {
    return `${(val / 10 ** 3).toPrecision(3)} K`;
  }

  if (val < 10 ** 9) {
    return `${(val / 10 ** 6).toPrecision(3)} M`; // million
  }

  if (val < 10 ** 12) {
    return `${(val / 10 ** 9).toPrecision(3)} B`; // billion
  }

  if (val < 10 ** 15) {
    return `${(val / 10 ** 12).toPrecision(3)} T`; // trillion
  }

  return `${Math.round(val / 10 ** 12)} T`;
};
