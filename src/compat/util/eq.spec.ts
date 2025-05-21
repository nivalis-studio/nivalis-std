import { describe, expect, it } from 'vitest';
import { eq } from './eq';

describe('eq', () => {
  it('should perform a `SameValueZero` comparison of two values', () => {
    expect(eq()).toBe(true);
    expect(eq()).toBe(true);
    expect(eq(0, -0)).toBe(true);
    expect(eq(Number.NaN, Number.NaN)).toBe(true);
    expect(eq(1, 1)).toBe(true);

    expect(eq(null)).toBe(false);
    expect(eq(1, new Object(1))).toBe(false);
    expect(eq(1, '1')).toBe(false);
    expect(eq(1, '1')).toBe(false);

    const object = { a: 1 };

    expect(eq(object, object)).toBe(true);
    expect(eq(object, { a: 1 })).toBe(false);
  });
});
