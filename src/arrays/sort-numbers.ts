/**
 * Sorts an array of numbers in ascending or descending order.
 * @param {number[]} array - The array of numbers to sort.
 * @param {"asc"|"desc"} dir - The direction to sort the array. Can be 'asc' or 'desc'.
 * @returns {number[]} The sorted array of numbers.
 */
export const sortNumbers = (
  array: number[],
  dir = 'asc' as 'asc' | 'desc',
): number[] => [...array].sort((x, y) => (x - y) * (dir === 'desc' ? -1 : 1));
