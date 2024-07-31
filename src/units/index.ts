/**
 * convert bytes to kilobytes
 * @param bytes
 */
export const toKb = (bytes: number): number => Math.round(bytes / 1024);

/**
 * convert bytes to megabytes
 * @param bytes
 */
export const toMb = (bytes: number): number => Math.round(bytes / 1024 ** 2);

/**
 * convert bytes to gigabytes
 * @param bytes
 */
export const toGb = (bytes: number): number => Math.round(bytes / 1024 ** 3);

/**
 * convert bytes to Human bytes string
 * @param bytes
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
 * @param c
 */
export const toHumanCount = (c = 0): string => {
  if (c < 10 ** 4) {
    return String(c);
  }

  if (c < 10 ** 6) {
    return `${(c / 10 ** 3).toPrecision(3)} K`;
  }

  if (c < 10 ** 9) {
    return `${(c / 10 ** 6).toPrecision(3)} M`; // million
  }

  if (c < 10 ** 12) {
    return `${(c / 10 ** 9).toPrecision(3)} B`; // billion
  }

  if (c < 10 ** 15) {
    return `${(c / 10 ** 12).toPrecision(3)} T`; // trillion
  }

  return `${Math.round(c / 10 ** 12)} T`;
};
