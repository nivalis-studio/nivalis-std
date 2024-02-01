import {Future} from '../future';
import {Err, Ok, type Result} from '../result';

export type Promiseable<T> = T | Promise<T>;

export type MutexError = MutexLockError;

export class MutexLockError extends Error {
	readonly #class = MutexLockError;
	readonly name = this.#class.name;

	constructor() {
		super('Could not lock mutex');
	}
}

export class Mutex<T> {
	promise?: Promise<void>;

	#inner: T;

	constructor(inner: T) {
		this.#inner = inner;
	}

	get locked() {
		return this.promise != null;
	}

	acquire(): Promiseable<Lock<T>> {
		const future = new Future<void>();
		const promise = this.promise;
		this.lock(() => future.promise);

		const release = () => future.resolve();
		const access = new Lock(this.#inner, release);

		return promise ? promise.then(() => access) : access;
	}

	/**
	 * Lock this mutex
	 * @param callback
	 * @returns
	 */
	lock<R>(callback: (inner: T) => Promise<R>): Promise<R> {
		const promise = this.promise
			? this.promise.then(() => callback(this.#inner))
			: callback(this.#inner);

		// biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
		const pure = promise.then(() => {}).catch(() => {});
		this.promise = pure;

		pure.finally(() => {
			if (this.promise !== pure) {
				return;
			}
			this.promise = undefined;
		});

		return promise;
	}

	/**
	 * Try to lock this mutex
	 * @param callback
	 * @returns
	 */
	tryLock<R>(
		callback: (inner: T) => Promise<R>,
	): Result<Promise<R>, MutexLockError> {
		if (this.promise != null) {
			return new Err(new MutexLockError());
		}

		const promise = callback(this.#inner);

		// biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
		const pure = promise.then(() => {}).catch(() => {});
		this.promise = pure;

		pure.finally(() => {
			if (this.promise !== pure) {
				return;
			}
			this.promise = undefined;
		});

		return new Ok(promise);
	}
}

export class Lock<T> {
	#inner: T;
	#release: () => void;

	constructor(inner: T, release: () => void) {
		this.#inner = inner;
		this.#release = release;
	}

	[Symbol.dispose]() {
		this.#release();
	}
}
