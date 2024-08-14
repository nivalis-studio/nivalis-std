/**
 * Returns the average of an array.
 * @param {number[]} array - An array of numbers to calculate the average.
 * @returns {number} The average of all the numbers in the array.
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const result = average(numbers);
 * // result will be 3
 */
export const average = (array: number[]): number =>
  [...array].reduce((acc, value) => acc + value, 0) / array.length;
