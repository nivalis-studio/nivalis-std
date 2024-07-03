import { createCustomException } from '../exceptions';
import type { Exception } from '../exceptions';
import { Future } from '../future';
import { Err, Ok } from '../result';
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
	readonly inner: T;
	readonly release: () => void;

	constructor(inner: T, release: () => void) {
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

	readonly inner: T;
	readonly capacity: N;

	constructor(inner: T, capacity: N) {
		this.inner = inner;
		this.capacity = capacity;
	}

	static void<N extends number>(capacity: N) {
		return new Semaphore<void, N>(undefined, capacity);
	}

	get locked() {
		return this.#count >= this.capacity;
	}

	get count() {
		return this.#count;
	}

	/**
	 * Lock or throw an error
	 * @param callback
	 */
	lockOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
		if (this.#count >= this.capacity) {
			throw new LockedError();
		}

		this.#count += 1;

		const promise = Promise.resolve(callback(this.inner))
			.finally(() => this.#queue.shift()?.resolve())
			.finally(() => this.#count--);

		return promise;
	}

	/**
	 * Lock or return an error
	 * @param callback
	 * @returns
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
	 * @param callback
	 */
	lock<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
		this.#count++;

		if (this.#count > this.capacity) {
			const future = new Future<void>();
			this.#queue.push(future);

			const promise = future.promise
				.then(() => callback(this.inner))
				.finally(() => this.#queue.shift()?.resolve())
				.finally(() => this.#count--);

			return promise;
		}

		const promise = Promise.resolve(callback(this.inner))
			.finally(() => this.#queue.shift()?.resolve())
			.finally(() => this.#count--);

		return promise;
	}

	/**
	 * Just wait
	 * @returns
	 */
	wait(): Promise<void> {
		const outer = new Future<void>();
		this.lock(() => outer.resolve());
		return outer.promise;
	}

	/**
	 * Lock and return a disposable object
	 * @returns
	 */
	async acquire(): Promise<Lock<T>> {
		const outer = new Future<void>();
		const inner = new Future<void>();

		this.lock(() => {
			outer.resolve();
			return inner.promise;
		});

		await outer.promise;

		return new Lock(this.inner, () => inner.resolve());
	}
}

/**
 * A semaphore but with a capacity of 1
 */
export class Mutex<T> {
	#semaphore: Semaphore<T, 1>;
	readonly inner: T;

	constructor(inner: T) {
		this.#semaphore = new Semaphore(inner, 1);
		this.inner = inner;
	}

	static void() {
		return new Mutex<void>(undefined);
	}

	get locked() {
		return this.#semaphore.locked;
	}

	lockOrThrow<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
		return this.#semaphore.lockOrThrow(callback);
	}

	tryLock<R>(
		callback: (inner: T) => Awaitable<R>,
	): Result<Promise<R>, Exception> {
		return this.#semaphore.tryLock(callback);
	}

	lock<R>(callback: (inner: T) => Awaitable<R>): Promise<R> {
		return this.#semaphore.lock(callback);
	}

	wait(): Promise<void> {
		return this.#semaphore.wait();
	}

	async acquire(): Promise<Lock<T>> {
		return await this.#semaphore.acquire();
	}
}
