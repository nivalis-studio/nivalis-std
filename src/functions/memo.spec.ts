import { describe, expect, mock, test } from 'bun:test';
import { memo } from './memo';
import { sleep } from './sleep';

const keyFunc = (x: number, y: number) => `${x}-${y}`;

describe('memo', () => {
  test('should return the cached result on subsequent calls', () => {
    const func = mock((x: number) => x * 2);
    const memoizedFunc = memo(func);

    const firstCall = memoizedFunc(2);
    const secondCall = memoizedFunc(2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(firstCall).toBe(4);
    expect(secondCall).toBe(4);
  });

  test('should compute and cache new result if cache is expired', async () => {
    const func = mock((x: number) => x * 3);
    const ttl = 5;
    const memoizedFunc = memo(func, { ttl });

    const firstCall = memoizedFunc(3);

    expect(firstCall).toBe(9);

    await sleep(ttl + 5); // Wait for the cache to expire

    const secondCall = memoizedFunc(3);

    expect(func).toHaveBeenCalledTimes(2);
    expect(secondCall).toBe(9);
  });

  test('should use custom key function for caching', () => {
    const func = mock((x: number, y: number) => x + y);

    const memoizedFunc = memo(func, { key: keyFunc });

    const firstCall = memoizedFunc(1, 2);
    const secondCall = memoizedFunc(1, 2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(firstCall).toBe(3);
    expect(secondCall).toBe(3);

    const thirdCall = memoizedFunc(2, 1);

    expect(func).toHaveBeenCalledTimes(2);
    expect(thirdCall).toBe(3);
  });

  test('should handle cache without TTL', () => {
    const func = mock((x: number) => x * 4);
    const memoizedFunc = memo(func);

    const firstCall = memoizedFunc(2);

    expect(firstCall).toBe(8);

    const secondCall = memoizedFunc(2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(secondCall).toBe(8);
  });

  test('should handle different arguments correctly', () => {
    const func = mock((x: number) => x * 5);
    const memoizedFunc = memo(func);

    const firstCall = memoizedFunc(2);

    expect(firstCall).toBe(10);

    const secondCall = memoizedFunc(3);

    expect(func).toHaveBeenCalledTimes(2);
    expect(secondCall).toBe(15);
  });

  test('should work correctly with no options provided', () => {
    const func = mock((x: number) => x * 6);
    const memoizedFunc = memo(func);

    const result = memoizedFunc(2);

    expect(result).toBe(12);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
