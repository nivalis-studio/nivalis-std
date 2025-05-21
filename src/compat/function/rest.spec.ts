import { describe, expect, it } from 'vitest';
import { rest } from './rest';

describe('rest', () => {
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return [...arguments];
  }

  it('should apply a rest parameter to `func`', () => {
    const restFn = rest(fn);

    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
  });

  it('should work with `start`', () => {
    const restFn = rest(fn, 1);

    expect(restFn(1, 2, 3, 4)).toEqual([1, [2, 3, 4]]);
  });

  it('should treat `start` as `0` for `NaN` or negative values', () => {
    let restFn = rest(fn, -1);

    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
    restFn = rest(fn, Number.NaN);
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
    // @ts-expect-error - intentionally passing a string
    restFn = rest(fn, 'a');
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
  });

  it('should coerce `start` to an integer', () => {
    const restFn = rest(fn, 1.6);

    expect(restFn(1, 2, 3)).toEqual([1, [2, 3]]);
  });

  it('should use an empty array when `start` is not reached', () => {
    const restFn = rest(fn);

    expect(restFn(1)).toEqual([1, undefined, []]);
  });

  it('should work on functions with more than three parameters', () => {
    const restFn = rest(function (
      _a: unknown,
      _b: unknown,
      _c: unknown,
      _d: unknown,
    ) {
      // eslint-disable-next-line prefer-rest-params
      return [...arguments];
    });

    expect(restFn(1, 2, 3, 4, 5)).toEqual([1, 2, 3, [4, 5]]);
  });
});
