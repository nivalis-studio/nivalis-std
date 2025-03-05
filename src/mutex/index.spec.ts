import { describe, expect, test } from 'bun:test';
import { sleep } from '../functions/sleep';
import { LockedError, Mutex, Semaphore } from './index';

const wait = async (ms = 1) => {
  await sleep(ms);
};

describe('Mutex', () => {
  test('sequential operations with runOrWait', async () => {
    const mutex = new Mutex(new Array<string>());

    await mutex.runOrWait(async (order: string[]) => {
      order.push('first start');
      await wait(10);
      order.push('first end');
    });

    await mutex.runOrWait(async (order: string[]) => {
      order.push('second start');
      await wait(10);
      order.push('second end');
    });

    await mutex.runOrWait(async (order: string[]) => {
      order.push('third start');
      await wait(10);
      order.push('third end');
    });

    expect(mutex.inner).toEqual([
      'first start',
      'first end',
      'second start',
      'second end',
      'third start',
      'third end',
    ]);
  });

  test('runOrThrow should fail when locked', async () => {
    const mutex = new Mutex(new Array<string>());
    const lock = await mutex.getOrWait();

    expect(mutex.locked).toBe(true);

    try {
      await mutex.runOrThrow(async () => {
        await wait(1);
      });
      throw new Error('Should have thrown');
    } catch (error) {
      expect(error instanceof LockedError).toBe(true);
    }

    lock.release();
    expect(mutex.locked).toBe(false);
  });

  test('getOrWait and release pattern', async () => {
    const mutex = new Mutex(new Array<string>());
    const lock1 = await mutex.getOrWait();

    expect(mutex.locked).toBe(true);
    lock1.inner.push('first start');
    await wait(10);
    lock1.inner.push('first end');
    lock1.release();
    await wait(0);

    expect(mutex.locked).toBe(false);

    await mutex.runOrWait(async (order: string[]) => {
      order.push('second start');
      await wait(10);
      order.push('second end');
    });

    const lock2 = await mutex.getOrWait();

    expect(mutex.locked).toBe(true);
    lock2.inner.push('third start');
    await wait(10);
    lock2.inner.push('third end');
    lock2.release();
    await wait(0);

    expect(mutex.locked).toBe(false);

    expect(mutex.inner).toEqual([
      'first start',
      'first end',
      'second start',
      'second end',
      'third start',
      'third end',
    ]);
  });
});

describe('Semaphore', () => {
  test('concurrent operations with capacity', async () => {
    const semaphore = new Semaphore<void, 3>(undefined, 3);
    const results: string[] = [];

    const operation = async (id: number): Promise<void> => {
      await semaphore.runOrWait(async () => {
        results.push(`start ${id}`);
        await wait(10);
        results.push(`end ${id}`);
      });
    };

    const promises = [1, 2, 3, 4, 5].map(async num => {
      await operation(num);
    });

    await Promise.all(promises);

    expect(results.length).toBe(10);
    expect(semaphore.locked).toBe(false);
  });

  test('mixed getOrWait and runOrWait operations', async () => {
    const semaphore = new Semaphore<string[], 1>([], 1);
    const lock = await semaphore.getOrWait();

    expect(semaphore.locked).toBe(true);
    lock.inner.push('acquired');
    lock.release();
    await wait(0);

    expect(semaphore.locked).toBe(false);

    await semaphore.runOrWait(async (inner: string[]) => {
      inner.push('waited');
      await wait(1);
    });

    expect(semaphore.locked).toBe(false);
    expect(semaphore.inner).toEqual(['acquired', 'waited']);
  });
});
