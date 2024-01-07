export class Err<T = unknown> {
	#inner: T;

	constructor(inner: T) {
		this.#inner = inner;
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
	 * Returns an iterator over the possibly contained value
	 * @yields `this.inner` if `Ok`
	 */
	// biome-ignore lint/correctness/useYield: Only works with `Ok`
	*[Symbol.iterator](): Iterator<never, void> {
		return;
	}

	/**
	 * Type guard for `Ok`
	 * @returns `true` if `Ok`, `false` if `Err`
	 */
	isOk(): false {
		return false;
	}

	/**
	 * Type guard for `Err`
	 * @returns `true` if `Err`, `false` if `Ok`
	 */
	isErr(): this is Err<T> {
		return true;
	}
}
