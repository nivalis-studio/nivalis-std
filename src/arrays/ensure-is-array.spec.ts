import { describe, expect, test } from 'bun:test';
import { ensureIsArray } from './ensure-is-array';

describe('ensureIsArray', () => {
  test('should wrap a non-array value in an array', () => {
    const result = ensureIsArray(1);

    expect(result).toEqual([1]);
  });

  test('should return the same array if the input is already an array', () => {
    const array = [1, 2, 3];
    const result = ensureIsArray(array);

    expect(result).toBe(array);
  });

  test('should wrap a string in an array if it is not an array', () => {
    const result = ensureIsArray('hello');

    expect(result).toEqual(['hello']);
  });

  test('should return the same array if the input is an array of strings', () => {
    const array = ['a', 'b', 'c'];
    const result = ensureIsArray(array);

    expect(result).toBe(array);
  });

  test('should wrap an object in an array if it is not an array', () => {
    const obj = { key: 'value' };
    const result = ensureIsArray(obj);

    expect(result).toEqual([obj]);
  });

  test('should return the same array if the input is an array of objects', () => {
    const array = [{ key: 'value' }, { key: 'anotherValue' }];
    const result = ensureIsArray(array);

    expect(result).toBe(array);
  });

  test('should return an empty array when an empty array is passed', () => {
    const result = ensureIsArray([]);

    expect(result).toEqual([]);
  });
});
