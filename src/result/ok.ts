export class Ok<T = unknown> {
	#inner: T;

	constructor(inner: T) {
		this.#inner = inner;
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
	 * Returns an iterator over the possibly contained value
	 * @yields `this.inner` if `Ok`
	 */
	*[Symbol.iterator](): Iterator<T, void> {
		yield this.#inner;
	}

	/**
	 * Type guard for `Ok`
	 * @returns `true` if `Ok`, `false` if `Err`
	 */
	isOk(): this is Ok<T> {
		return true;
	}

	/**
	 * Type guard for `Err`
	 * @returns `true` if `Err`, `false` if `Ok`
	 */
	isErr(): false {
		return false;
	}
}
