/**
 * Remove duplicate items from an array.
 */
export const unDuplicate = <T>(array: T[]) => [...new Set(array)];
