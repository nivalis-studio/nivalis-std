import { describe, expect, mock, test } from 'bun:test';
import { sleep } from '../functions/sleep';
import { throttle } from './throttle';

const ms = 10;

describe('throttle', () => {
  test('should invoke the function immediately on first call', () => {
    const func = mock(() => {});
    const throttledFunc = throttle(func, ms);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('should not invoke the function again within the throttle time', () => {
    const func = mock(() => {});
    const throttledFunc = throttle(func, ms);

    throttledFunc();
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('should invoke the function again after the throttle time has passed', async () => {
    const func = mock(() => {});
    const throttledFunc = throttle(func, ms);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await sleep(ms + 10);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('should not invoke the function multiple times if called repeatedly within throttle time', async () => {
    const func = mock(() => {});
    const throttledFunc = throttle(func, ms);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    for (let i = 0; i < 10; i++) {
      throttledFunc();
    }

    expect(func).toHaveBeenCalledTimes(1);

    await sleep(ms + 10);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('should handle consecutive calls correctly with timeouts', async () => {
    const func = mock(() => {});
    const throttledFunc = throttle(func, ms);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await sleep(ms / 2);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await sleep(ms / 2);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });
});
