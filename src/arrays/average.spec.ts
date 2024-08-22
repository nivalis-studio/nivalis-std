import { describe, expect, it } from 'bun:test';
import { average } from './average';

describe('average', () => {
  it('returns the average of the function', () => {
    expect(average([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('returns NaN for empty arrays', () => {
    expect(average([])).toEqual(Number.NaN);
  });
});
