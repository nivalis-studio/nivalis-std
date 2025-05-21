import { describe, expect, it } from 'vitest';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { stubFalse } from '../util/stubFalse';
import { isObjectLike } from './isObjectLike';

describe('isObjectLike', () => {
  it('should return `true` for objects', () => {
    expect(isObjectLike(args)).toBe(true);
    expect(isObjectLike([1, 2, 3])).toBe(true);
    expect(isObjectLike(new Object(false))).toBe(true);
    expect(isObjectLike(new Date())).toBe(true);
    expect(isObjectLike(new Error())).toBe(true);
    expect(isObjectLike({ a: 1 })).toBe(true);
    expect(isObjectLike(new Object(0))).toBe(true);
    expect(isObjectLike(/x/)).toBe(true);
    expect(isObjectLike(new Object('a'))).toBe(true);
  });

  it('should return `false` for non-objects', () => {
    const values = [...falsey, true].concat(slice, 1, 'a', symbol);
    const expected = values.map(stubFalse);

    const actual = values.map(isObjectLike);

    expect(actual).toEqual(expected);
  });
});
