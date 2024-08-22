import { describe, expect, test } from 'bun:test';
import { Future } from './index';

const ms = 1;

describe('Future', () => {
  test('should resolve with the correct value', async () => {
    const future = new Future<number>();
    const resolvedValue = 42;

    setTimeout(() => {
      future.resolve(resolvedValue);
    }, ms);

    const result = await future;

    expect(result).toBe(resolvedValue);
  });

  test('should reject with the correct error', async () => {
    const future = new Future<number>();
    const error = new Error('Something went wrong');

    setTimeout(() => {
      future.reject(error);
    }, ms);

    try {
      await future;
    } catch (error_) {
      expect(error_).toBe(error);
    }
  });

  test('then method should work correctly', async () => {
    const future = new Future<number>();
    const resolvedValue = 10;

    setTimeout(() => {
      future.resolve(resolvedValue);
    }, ms);

    const result = await future.then(value => value * 2);

    expect(result).toBe(resolvedValue * 2);
  });

  test('catch method should work correctly', async () => {
    const future = new Future<number>();
    const error = new Error('Test error');

    setTimeout(() => {
      future.reject(error);
    }, ms);

    const result = await future.catch((error_: unknown) => {
      expect(error_).toBe(error);

      return 0;
    });

    expect(result).toBe(0);
  });

  test('finally method should work correctly', async () => {
    const future = new Future<number>();
    const resolvedValue = 5;
    let finallyCalled = false;

    setTimeout(() => {
      future.resolve(resolvedValue);
    }, ms);

    const result = await future.finally(() => {
      finallyCalled = true;
    });

    expect(finallyCalled).toBe(true);
    expect(result).toBe(resolvedValue);
  });

  test('should behave like a promise with then, catch, and finally chaining', async () => {
    const future = new Future<number>();

    setTimeout(() => {
      future.resolve(7);
    }, ms);

    const result = await future
      .then(value => value * 3)
      .catch(() => 0)
      .finally(() => {
        // Finally block
      });

    expect(result).toBe(21);
  });

  test('should reject in thenable chain', async () => {
    const future = new Future<number>();
    const error = new Error('Chain error');

    setTimeout(() => {
      future.reject(error);
    }, ms);

    try {
      await future.then(value => value * 2);
    } catch (error_) {
      expect(error_).toBe(error);
    }
  });
});
