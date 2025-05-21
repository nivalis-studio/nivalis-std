import { describe, expect, it } from 'vitest';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { stubFalse } from '../util/stubFalse';
import { isObject } from './isObject';

describe('isObject', () => {
  it('should return `true` if value is an object', () => {
    expect(isObject(args)).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(new Object(false))).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Error())).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(new Number(0))).toBe(true);
    expect(isObject(slice)).toBe(true);
    expect(isObject(/x/)).toBe(true);
    expect(isObject(new String(''))).toBe(true);
  });

  it('should return `false` for non-objects', () => {
    const values = [...falsey, true, 1, 'a'].concat(symbol);
    const expected = values.map(stubFalse);
    const actual = values.map(isObject);

    expect(actual).toEqual(expected);
  });
});
