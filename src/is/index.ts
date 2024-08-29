/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
export { isBuffer } from './is-buffer';
export { isError } from './is-error';
export { isObjectLike } from './is-object-like';
export { nonNullable, fieldNonNullable } from './non-nullable';
export { isEqual } from './is-equal';

export const isSymbol = (value: any): value is symbol =>
  !!value && value.constructor === Symbol;

export const isArray = (value: any): value is any[] => Array.isArray(value);

export const isObject = (value: any): value is object =>
  !!value && value.constructor === Object;

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Checks if the given value is primitive.
 *
 * Primitive Types: number , string , boolean , symbol, bigint, undefined, null
 * @param {*} value value to check
 * @returns {boolean} result
 */
export const isPrimitive = (value: any): value is Primitive =>
  value === undefined ||
  value === null ||
  (typeof value !== 'object' && typeof value !== 'function');

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (value: any): value is Function =>
  !!(value?.constructor && value.call && value.apply);

export const isString = (value: any): value is string =>
  typeof value === 'string' || value instanceof String;

export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value;
  } catch {
    return false;
  }
};

export const isInt = (value: any): value is number =>
  isNumber(value) && value % 1 === 0;

export const isFloat = (value: any): value is number =>
  isNumber(value) && value % 1 !== 0;

export const isDate = (value: any): value is Date =>
  Object.prototype.toString.call(value) === '[object Date]';

/**
 * This is really a _best guess_ promise checking. You
 * should probably use Promise.resolve(value) to be 100%
 * sure you're handling it correctly.
 * @param {*} value value to check
 * @returns {boolean} result
 */
export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false;

  if (!value.then) return false;

  if (!isFunction(value.then)) return false;

  return true;
};

export const isEmpty = (value: any) => {
  if (value === true || value === false) return true;

  if (value === null || value === undefined) return true;

  if (isNumber(value)) return value === 0;

  if (isDate(value)) return Number.isNaN(value.getTime());

  if (isFunction(value)) return false;

  if (isSymbol(value)) return false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const length = value.length;

  if (isNumber(length)) return length === 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const size = value.size;

  if (isNumber(size)) return size === 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(value).length;

  return keys === 0;
};
