import { describe, expect, it } from 'vitest';
import { falsey } from '../_internal/falsey';
import { sortedLastIndexOf } from './sortedLastIndexOf';

describe('sortedLastIndexOf', () => {
  // --------------- Lodash Test Case #1 -------------------
  it('`sortedLastIndexOf` should perform a binary search', () => {
    const sorted = [4, 4, 5, 5, 6, 6];

    expect(sortedLastIndexOf(sorted, 5)).toEqual(3);
  });

  // --------------- Lodash Test Case #2 -------------------
  it('`sortedLastIndexOf` should accept a falsey `array`', () => {
    const expected = falsey.map(() => -1);

    const actual = falsey.map((array, index) => {
      try {
        // @ts-expect-error - Testing with falsey values
        return index ? sortedLastIndexOf(array) : sortedLastIndexOf();
      } catch {}
    });

    expect(actual).toEqual(expected);
  });

  it('`sortedLastIndexOf` should return `-1` for an unmatched value', () => {
    const array = [1, 2, 3];
    const empty: unknown[] = [];

    expect(sortedLastIndexOf(array, 4)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, 4, true)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, undefined, true)).toBe(-1);

    expect(sortedLastIndexOf(empty)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(empty, undefined, true)).toBe(-1);
  });

  it('`sortedLastIndexOf` should not match values on empty arrays', () => {
    const array = [];

    array[-1] = 0;

    expect(sortedLastIndexOf(array)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, 0, true)).toBe(-1);
  });

  it('`sortedLastIndexOf` should match `NaN`', () => {
    const array = [1, 2, Number.NaN, Number.NaN];

    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, Number.NaN, true)).toBe(3);
  });

  it('`sortedLastIndexOf` should match `-0` as `0`', () => {
    expect(sortedLastIndexOf([-0], 0)).toBe(0);
    expect(sortedLastIndexOf([0], -0)).toBe(0);
  });

  // Additional tests specific to sortedLastIndexOf
  it('should find the last occurrence of value in a sorted array', () => {
    const array = [1, 2, 2, 3, 3, 3, 4, 5, 5];

    expect(sortedLastIndexOf(array, 2)).toBe(2);
    expect(sortedLastIndexOf(array, 3)).toBe(5);
    expect(sortedLastIndexOf(array, 5)).toBe(8);
  });
});
