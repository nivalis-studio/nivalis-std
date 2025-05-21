// @vitest-environment happy-dom
import { describe, expect, it } from 'bun:test';
import { isBrowser } from './isBrowser';

describe('isBrowser', () => {
  it('should return true in browser environment', () => {
    expect(isBrowser()).toBe(true);
  });
});
