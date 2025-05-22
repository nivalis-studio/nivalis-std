import { describe, expect, it } from 'bun:test';
import { asyncNoop } from './async-noop';

describe('asyncNoop', () => {
  it('should be a function', () => {
    expect(typeof asyncNoop).toBe('function');
  });

  it('should return a Promise', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });

  it('should resolve to undefined', async () => {
    await expect(asyncNoop()).resolves.toBeUndefined();
  });
});
