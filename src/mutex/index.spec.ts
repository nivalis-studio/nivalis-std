import { describe, expect, test } from 'bun:test';
import { sleep } from '../functions/sleep';
import { Mutex, Semaphore } from './index';

const wait = async (ms = 10) => {
  await sleep(ms);
};

describe('Mutex', () => {
  const mutex = new Mutex(new Array<string>());

  test('lock', async () => {
    await mutex.lock(() => {
      expect(mutex.locked).toBe(true);
    });
  });

  test('try lock', () => {
    expect(mutex.locked).toBe(false);
    const result = mutex.tryLock(async () => {});

    expect(result.isErr()).toBe(false);
  });

  test('fail try lock', async () => {
    const [result] = await Promise.all([
      wait().then(() =>
        mutex.tryLock(async () => {
          await wait();
        }),
      ),
      mutex.lock(async () => {
        await wait();
        expect(mutex.locked).toBe(true);
      }),
    ]);

    expect(result.isErr()).toBe(true);

    await wait();

    expect(mutex.locked).toBe(false);
  });

  test('acquire', async () => {
    expect(mutex.locked).toBe(false);
    const lock1 = await mutex.acquire();

    expect(mutex.locked).toBe(true);

    lock1.inner.push('first start');
    await wait();
    lock1.inner.push('first end');
    lock1.release();

    await wait(0);
    expect(mutex.locked).toBe(false);

    await mutex.lock(async inner => {
      inner.push('second start');
      await wait();
      inner.push('second end');
    });

    expect(mutex.locked).toBe(false);
    const lock2 = await mutex.acquire();

    expect(mutex.locked).toBe(true);

    lock2.inner.push('third start');
    await wait();
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
  const semaphore = new Semaphore(new Array<string>(), 1);

  test('lock', async () => {
    await semaphore.lock(() => {
      expect(semaphore.locked).toBe(true);
    });
  });

  test('try lock', () => {
    expect(semaphore.locked).toBe(false);
    const result = semaphore.tryLock(async () => {});

    expect(result.isErr()).toBe(false);
  });

  test('fail try lock', async () => {
    const [result] = await Promise.all([
      wait().then(() =>
        semaphore.tryLock(async () => {
          await wait();
        }),
      ),
      semaphore.lock(async () => {
        await wait();
        expect(semaphore.locked).toBe(true);
      }),
    ]);

    expect(result.isErr()).toBe(true);

    await wait();

    expect(semaphore.locked).toBe(false);
  });

  test('acquire', async () => {
    expect(semaphore.locked).toBe(false);
    const lock1 = await semaphore.acquire();

    expect(semaphore.locked).toBe(true);

    lock1.inner.push('first start');
    await wait();
    lock1.inner.push('first end');
    lock1.release();

    await wait(0);
    expect(semaphore.locked).toBe(false);

    await semaphore.lock(async inner => {
      inner.push('second start');
      await wait();
      inner.push('second end');
    });

    expect(semaphore.locked).toBe(false);
    const lock2 = await semaphore.acquire();

    expect(semaphore.locked).toBe(true);

    lock2.inner.push('third start');
    await wait();
    lock2.inner.push('third end');
    lock2.release();

    await wait(0);
    expect(semaphore.locked).toBe(false);

    expect(semaphore.inner).toEqual([
      'first start',
      'first end',
      'second start',
      'second end',
      'third start',
      'third end',
    ]);
  });
});
