import type {ResultInterface} from './types';

export class Ok<T, E> implements ResultInterface<T, E> {
	#inner: T;

	constructor(inner: T) {
		this.#inner = inner;
	}

	get value(): T {
		return this.#inner;
	}

	get error(): null {
		return null;
	}

	/**
	 * Type guard for `Ok`
	 * @returns `true` if `Ok`, `false` if `Err`
	 */
	isOk(): this is Ok<T, E> {
		return true;
	}

	/**
	 * Type guard for `Err`
	 * @returns `true` if `Err`, `false` if `Ok`
	 */
	isErr(): false {
		return false;
	}

	/**
	 * Returns an iterator over the possibly contained value
	 * @yields `this.inner` if `Ok`
	 */
	*[Symbol.iterator](): Iterator<T, void> {
		yield this.#inner;
	}

	/**
	 * Get the inner value or panic
	 * @returns `this.inner` if `Ok`
	 * @throws `this.inner` if `Err`
	 */
	unwrap(): T {
		return this.#inner;
	}

	/**
	 * Unwrap the `Ok` value, or return the default if there is an `Err`
	 *
	 * @param val the default value to return if there is an `Err`
	 */
	unwrapOr<K>(_val: K): T | K {
		return this.#inner;
	}
}

export const ok = <T, E = never>(value: T): Ok<T, E> => new Ok(value);
