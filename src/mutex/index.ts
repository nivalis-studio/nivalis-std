/* eslint-disable max-classes-per-file */

import { createCustomException } from '../exceptions';
import { Future } from '../future';

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
export class Semaphore<T, N extends number = number> {
  #queue = new Array<Future<void>>();
  #count = 0;

  constructor(
    readonly inner: T,
    readonly capacity: N,
  ) {}

  get locked() {
    return this.#count >= this.capacity;
  }

  get count() {
    return this.#count;
  }

  static void<N extends number>(capacity: N) {
    return new Semaphore<void, N>(undefined, capacity);
  }

  get() {
    return this.inner;
  }

  /**
   * Get and lock or throw
   * @template T - The type of the inner value
   * @returns {Lock<T>} A lock object that must be released
   */
  getOrThrow(): Lock<T> {
    if (this.#count >= this.capacity) {
      throw new LockedError();
    }

    this.#count += 1;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const release = () => {
      this.#queue.shift()?.resolve();
      this.#count -= 1;
    };

    return new Lock(this.inner, release);
  }

  /**
   * Get a lock or wait
   * @template T - The type of the inner value
   * @returns {Promise<Lock<T>>} A lock
   */
  async getOrWait(): Promise<Lock<T>> {
    this.#count += 1;

    if (this.#count > this.capacity) {
      const future = new Future<void>();

      this.#queue.push(future);
      await future.promise;
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const release = () => {
      this.#queue.shift()?.resolve();
      this.#count -= 1;
    };

    return new Lock(this.inner, release);
  }

  /**
   * Run and lock or throw
   * @template T - The type of the inner value
   * @template R - The return type of the callback
   * @param {(inner: T) => Awaitable<R>} callback - The callback to execute while locked
   * @returns {Promise<R>} The result of the callback
   */
  async runOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    if (this.#count >= this.capacity) {
      throw new LockedError();
    }

    this.#count += 1;

    try {
      return await callback(this.inner);
    } finally {
      this.#queue.shift()?.resolve();
      this.#count -= 1;
    }
  }

  /**
   * Run and lock or wait
   * @template T - The type of the inner value
   * @template R - The return type of the callback
   * @param {(inner: T) => Awaitable<R>} callback - The callback to execute while locked
   * @returns {Promise<R>} The result of the callback
   */
  async runOrWait<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    this.#count += 1;

    if (this.#count > this.capacity) {
      const future = new Future<void>();

      this.#queue.push(future);
      await future.promise;
    }

    try {
      return await callback(this.inner);
    } finally {
      this.#queue.shift()?.resolve();
      this.#count -= 1;
    }
  }
}

/**
 * A semaphore but with a capacity of 1
 */
export class Mutex<T> {
  #semaphore: Semaphore<T, 1>;

  constructor(readonly inner: T) {
    this.#semaphore = new Semaphore(inner, 1);
  }

  get locked() {
    return this.#semaphore.locked;
  }

  static void() {
    return new Mutex<void>(undefined);
  }

  getOrThrow(): Lock<T> {
    return this.#semaphore.getOrThrow();
  }

  async getOrWait(): Promise<Lock<T>> {
    return await this.#semaphore.getOrWait();
  }

  async runOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    return await this.#semaphore.runOrThrow(callback);
  }

  async runOrWait<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
    return await this.#semaphore.runOrWait(callback);
  }
}
