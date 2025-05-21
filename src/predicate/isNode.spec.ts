// @vitest-environment node
import { describe, expect, it } from 'bun:test';
import { isNode } from './isNode';

describe('isNode', () => {
  it('should return true in node environment', () => {
    expect(isNode()).toBe(true);
  });
});
