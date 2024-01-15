import type {ResultInterface} from './types';

export class Err<T, E> implements ResultInterface<T, E> {
	#inner: E;

	constructor(inner: E) {
		this.#inner = inner;
	}

	get value(): E {
		return this.#inner;
	}

	/**
	 * Used to check if a `Result` is an `OK`
	 * @returns `true` if `Ok`, `false` if `Err`
	 */
	isOk(): false {
		return false;
	}

	/**
	 * Used to check if a `Result` is an `Err`
	 * @returns `true` if `Err`, `false` if `Ok`
	 */
	isErr(): this is Err<T, E> {
		return true;
	}

	/**
	 * Returns an iterator over the possibly contained value
	 * @yields `this.inner` if `Ok`
	 */
	// biome-ignore lint/correctness/useYield: Only works with `Ok`
	*[Symbol.iterator](): Iterator<never, void> {
		return;
	}

	/**
	 * Get the inner value or panic
	 * @returns `this.inner` if `Ok`
	 * @throws `this.inner` if `Err`
	 */
	unwrap(): never {
		throw this.#inner;
	}

	/**
	 * Unwrap the `Ok` value, or return the default if there is an `Err`
	 *
	 * @param val the default value to return if there is an `Err`
	 */
	unwrapOr<K>(val: K): T | K {
		return val;
	}
}

export const err = <T = never, E = unknown>(err: E): Err<T, E> => new Err(err);
