/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: mock fn */
import { describe, expect, mock, test } from 'bun:test';
import { debounce } from './debounce';
import { sleep } from './sleep';

const ms = 10;

describe('debounce', () => {
  test('should call the debounced function after the specified delay', async () => {
    const func = mock(() => {});
    const debouncedFunc = debounce(func, ms);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await sleep(ms + 5);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('should reset the delay if called again before the delay is over', async () => {
    const func = mock(() => {});
    const debouncedFunc = debounce(func, ms);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await sleep(ms - 5);
    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await sleep(ms + 5);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('should not call the function if cancel is called', async () => {
    const func = mock(() => {});
    const debouncedFunc = debounce(func, ms);

    debouncedFunc();
    debouncedFunc.cancel();
    await sleep(ms + 5);
    expect(func).not.toHaveBeenCalled();
  });

  test('should not call the function if signal is aborted', async () => {
    const func = mock(() => {});
    const controller = new AbortController();
    const debouncedFunc = debounce(func, ms, { signal: controller.signal });

    debouncedFunc();
    controller.abort();
    await sleep(ms + 5);
    expect(func).not.toHaveBeenCalled();
  });

  test('should not set a new timeout if the signal is already aborted', async () => {
    const func = mock(() => {});
    const controller = new AbortController();

    controller.abort();
    const debouncedFunc = debounce(func, ms, { signal: controller.signal });

    debouncedFunc();
    await sleep(ms + 5);
    expect(func).not.toHaveBeenCalled();
  });
});
