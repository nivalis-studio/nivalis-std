/**
 * @param value
 * @example
 * ensureIsArray(1) // [1]
 */
export const ensureIsArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];
