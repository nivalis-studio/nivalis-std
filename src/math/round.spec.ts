import { describe, expect, it } from 'bun:test';
import { round } from './round';

describe('round function', () => {
  it('rounds a number to zero decimal places by default', () => {
    expect(round(1.5)).toBe(2);
    expect(round(1.4)).toBe(1);
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.5)).toBe(-1);
  });

  it('rounds a number to a specified number of decimal places', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2365, 2)).toBe(1.24);
    expect(round(-1.2345, 2)).toBe(-1.23);
    expect(round(-1.2365, 2)).toBe(-1.24);
  });

  it('handles zero precision as default precision', () => {
    expect(round(1.999)).toBe(2);
    expect(round(-1.999)).toBe(-2);
  });

  it('handles negative numbers properly', () => {
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.2345, 3)).toBe(-1.234);
    expect(round(-1.2344, 3)).toBe(-1.234);
  });

  it('rounds correctly at high precision levels', () => {
    expect(round(1.123_456_789, 5)).toBe(1.123_46);
    expect(round(-1.123_456_789, 5)).toBe(-1.123_46);
  });

  it('rounds correctly with edge cases', () => {
    expect(round(1.25, 1)).toBe(1.3);
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.25, 1)).toBe(-1.2);
    // The round function in JavaScript does not work as 'Round half to Even'
    expect(round(-1.35, 1)).toBe(-1.3);
  });

  it('works with zero', () => {
    expect(round(0)).toBe(0);
  });

  it('works with precision leading to no rounding', () => {
    expect(round(8.888_88, 5)).toBe(8.888_88);
  });

  it('handles edge cases where precision is not integer', () => {
    const value = 1.2345;
    const precision = 3.1;

    expect(round(value, precision)).toBe(1.234_386_076_761_533_1);
  });
});
