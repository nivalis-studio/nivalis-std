/**
 * Counts the occurrences of a value in an array.
 * @param array
 * @param value
 */
export const countOccurrences = <T>(array: T[], value: T): number =>
  array.reduce((a, v) => (v === value ? a + 1 : a), 0);
