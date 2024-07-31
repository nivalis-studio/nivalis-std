/**
 * Returns the average of an array.
 * @param array
 */
export const average = (array: number[]): number =>
  [...array].reduce((acc, value) => acc + value, 0) / array.length;
