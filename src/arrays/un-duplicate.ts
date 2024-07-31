/**
 * Remove duplicate items from an array.
 * @param array
 */
export const unDuplicate = <T>(array: T[]): T[] => [...new Set(array)];
