import { describe, expect, it } from 'vitest';
import { args } from '../_internal/args';
import { flatten } from './flatten';

describe('flatten', () => {
  it('should flatten `arguments` objects', () => {
    const array = [args, [args]];
    const expected = [1, 2, 3, args];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array.from({ length: 3 })];
    const expected = [1, 2, 3, undefined, undefined, undefined];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
    expect('4' in actual).toBeTruthy();
  });

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    const object = { 0: 'a', length: 1, [Symbol.isConcatSpreadable]: true };
    const array = [object];
    const expected = ['a'];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];
    const expected = [[], [], [[[]]]];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];
    const expected = [1, 2, [3, [4]], 5];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should return an empty array for non array-like objects', () => {
    const nonArray = { 0: 'a' };
    const expected: [] = [];
    const actual = flatten(nonArray as any);

    expect(actual).toEqual(expected);
  });

  it('should support array-like', () => {
    expect(flatten({ 0: [1, 2, 3], length: 1 })).toEqual([1, 2, 3]);
    expect(flatten('123')).toEqual(['1', '2', '3']);
    expect(flatten(args)).toEqual([1, 2, 3]);
  });
});
