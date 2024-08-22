import { describe, expect, test } from 'bun:test';
import { sleep } from './sleep';

const ms = 10;

describe('sleep', () => {
  test('should resolve after the specified time', async () => {
    const start = Date.now();

    await sleep(ms);

    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  test('should reject if aborted before the timeout', () => {
    const controller = new AbortController();
    const promise = sleep(1000, { signal: controller.signal });

    setTimeout(() => {
      controller.abort();
    }, ms);

    expect(promise).rejects.toThrow('Aborted');
  });

  test('should not resolve if aborted immediately', () => {
    const controller = new AbortController();

    controller.abort();
    const promise = sleep(ms * 10, { signal: controller.signal });

    expect(promise).rejects.toThrow('Aborted');
  });

  test('should not attach abort listener if no signal provided', async () => {
    const start = Date.now();

    await sleep(ms);

    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  test('should resolve correctly if signal is not aborted', () => {
    const controller = new AbortController();
    const promise = sleep(ms, { signal: controller.signal });

    expect(promise).resolves.toBeUndefined();
  });
});
