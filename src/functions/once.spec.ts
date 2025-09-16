/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: mock fn */
import { describe, expect, mock, test } from 'bun:test';
import { once } from './once';

describe('once', () => {
  test('should call the function only once and cache the result', () => {
    const func = mock(() => 'test result');
    const onceFunc = once(func);

    const firstCall = onceFunc();
    const secondCall = onceFunc();

    expect(func).toHaveBeenCalledTimes(1);
    expect(firstCall).toBe('test result');
    expect(secondCall).toBe('test result');
  });

  test('should return the cached result on subsequent calls', () => {
    const func = mock(() => 42);
    const onceFunc = once(func);

    const firstCall = onceFunc();

    expect(firstCall).toBe(42);

    const secondCall = onceFunc();

    expect(secondCall).toBe(42);

    expect(func).toHaveBeenCalledTimes(1);
  });

  test('should handle functions that return undefined', () => {
    const func = mock(() => {});
    const onceFunc = once(func);

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const firstCall = onceFunc();
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const secondCall = onceFunc();

    expect(func).toHaveBeenCalledTimes(1);
    expect(firstCall).toBeUndefined();
    expect(secondCall).toBeUndefined();
  });

  test('should work with functions that have side effects', () => {
    let counter = 0;
    const func = mock(() => {
      counter += 1;

      return counter;
    });
    const onceFunc = once(func);

    const firstCall = onceFunc();

    expect(firstCall).toBe(1);

    const secondCall = onceFunc();

    expect(secondCall).toBe(1);

    expect(counter).toBe(1);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
