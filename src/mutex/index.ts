/* eslint-disable no-plusplus */
import { createCustomException } from '../exceptions';
import { Future } from '../future';
import { Err, Ok } from '../result';
import type { Exception } from '../exceptions';
import type { Result } from '../result';

type Awaitable<T> = T | Promise<T>;

export const LockedError = createCustomException({
  defaultMessage: 'Locked',
  defaultName: 'LockedError',
});

/**
 * A releasable object
 */
export class Lock<T> {
  constructor(
    readonly inner: T,
    readonly release: () => void,
  ) {
    this.inner = inner;
    this.release = release;
  }

  [Symbol.dispose]() {
    this.release();
  }

  get() {
    return this.inner;
  }
}

/**
 * A semaphore with some reference and some capacity
 */
export class Semaphore<
  T extends Awaitable<unknown>,
  N extends number = number,
> {
  #queue = new Array<Future<void>>();
  #count = 0;

  constructor(
    readonly inner: T,
    readonly capacity: N,
  ) {
    this.inner = inner;
    this.capacity = capacity;
  }

  get locked() {
    return this.#count >= this.capacity;
  }

  get count() {
    return this.#count;
  }

  static void<N extends number>(capacity: N) {
    return new Semaphore<Awaitable<void>, N>(undefined, capacity);
  }

  /**
   * Lock or throw an error
   * @template R - The type of the return value
   * @template T - The type of the inner value
   * @param {(inner: T) => Awaitable<R>} callback - The callback to execute
   * @returns {Promise<R>} A promise that resolves with the result of the callback
   */
  async lockOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    if (this.#count >= this.capacity) {
      throw new LockedError();
    }

    this.#count += 1;

    const promise = Promise.resolve(callback(this.inner))
      .finally(() => this.#queue.shift()?.resolve())
      .finally(() => this.#count--);

    return await promise;
  }

  /**
   * Lock or return an error
   * @template R - The type of the return value
   * @template T - The type of the inner value
   * @param {(inner: T) => Awaitable<R>} callback - The callback to execute
   * @returns {Result<Promise<R>, Exception>} A result containing a promise or an error
   */
  tryLock<R>(
    callback: (inner: T) => Awaitable<R>,
  ): Result<Promise<R>, Exception> {
    if (this.#count >= this.capacity) {
      return new Err(new LockedError());
    }

    this.#count += 1;

    const promise = Promise.resolve(callback(this.inner))
      .finally(() => this.#queue.shift()?.resolve())
      .finally(() => this.#count--);

    return new Ok(promise);
  }

  /**
   * Lock or wait
   * @template R - The type of the return value
   * @template T - The type of the inner value
   * @param {(inner: T) => Awaitable<R>} callback - The callback to execute
   * @returns {Promise<R>} A promise that resolves with the result of the callback
   */
  async lock<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    this.#count++;

    if (this.#count > this.capacity) {
      const future = new Future<void>();

      this.#queue.push(future);

      const promise = future.promise
        // eslint-disable-next-line promise/no-callback-in-promise
        .then(async () => await callback(this.inner))
        .finally(() => this.#queue.shift()?.resolve())
        .finally(() => this.#count--);

      return await promise;
    }

    const promise = Promise.resolve(callback(this.inner))
      .finally(() => this.#queue.shift()?.resolve())
      .finally(() => this.#count--);

    return await promise;
  }

  /**
   * Just wait
   * @returns {Promise<void>} A promise that resolves when the lock is released
   */
  async wait(): Promise<void> {
    const outer = new Future<void>();

    await this.lock(() => {
      outer.resolve();
    });

    await outer.promise;
  }

  /**
   * Lock and return a disposable object
   * @template T - The type of the return value
   * @returns {Promise<Lock<T>>} A disposable object
   */
  async acquire(): Promise<Lock<T>> {
    const outer = new Future<null>();
    const inner = new Future<null>();

    await this.lock(async (): Promise<null> => {
      outer.resolve(null);

      return await inner.promise;
    });

    await outer.promise;

    return new Lock(this.inner, () => {
      inner.resolve(null);
    });
  }
}

/**
 * A semaphore but with a capacity of 1
 */
export class Mutex<T extends Awaitable<unknown>> {
  #semaphore: Semaphore<T, 1>;

  constructor(readonly inner: T) {
    this.#semaphore = new Semaphore(inner, 1);
    this.inner = inner;
  }

  get locked() {
    return this.#semaphore.locked;
  }

  static void() {
    return new Mutex<void>(undefined);
  }

  async lockOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    return await this.#semaphore.lockOrThrow(callback);
  }

  tryLock<R>(
    callback: (inner: T) => Awaitable<R>,
  ): Result<Promise<R>, Exception> {
    return this.#semaphore.tryLock(callback);
  }

  async lock<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    return await this.#semaphore.lock(callback);
  }

  async wait(): Promise<void> {
    await this.#semaphore.wait();
  }

  async acquire(): Promise<Lock<T>> {
    return await this.#semaphore.acquire();
  }
}
