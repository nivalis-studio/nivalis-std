import { describe, expect, it } from 'bun:test';
import { union } from './union';

describe('union', () => {
  it('should return the union of two arrays', () => {
    expect(union([2, 1], [2, 3])).toEqual([2, 1, 3]);
  });
});
