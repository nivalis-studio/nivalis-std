import { describe, expect, it } from 'vitest';
import { isEqual } from '../../predicate/isEqual';
import { attempt } from './attempt';

describe('attempt', () => {
  const errors = [
    new Error(),
    new EvalError(),
    new RangeError(),
    new ReferenceError(),
    new SyntaxError(),
    new TypeError(),
    new URIError(),
  ];

  class CustomError extends Error {
    name: string;
    message: string;

    constructor(message: string) {
      super();
      this.name = 'CustomError';
      this.message = message;
    }
  }

  it('should return the result of `func`', () => {
    expect(attempt(() => 'x')).toBe('x');
  });

  it('should provide additional arguments to `func`', () => {
    const actual = attempt(
      function (_a: unknown, _b: unknown) {
        // eslint-disable-next-line prefer-rest-params
        return [...arguments];
      },
      1,
      2,
    );

    expect(actual).toEqual([1, 2]);
  });

  it('should return the caught error', () => {
    const expected = errors.map(() => true);

    const actual = errors.map(
      error =>
        attempt(() => {
          throw error;
        }) === error,
    );

    expect(actual).toEqual(expected);
  });

  it('should coerce errors to error objects', () => {
    const actual = attempt(() => {
      throw 'x';
    });

    expect(isEqual(actual, new Error('x'))).toBeTruthy();
  });

  it('should preserve custom errors', () => {
    const actual = attempt(() => {
      throw new CustomError('x');
    });

    expect(actual instanceof CustomError);
  });
});
