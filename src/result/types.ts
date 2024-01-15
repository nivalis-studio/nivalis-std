import {Err} from './err';
import {Ok} from './ok';

export type Result<T, E> = Ok<T, E> | Err<T, E>;

export interface ResultInterface<T, E> {
	value: T | E;
	isOk(): this is Ok<T, E>;
	isErr(): this is Err<T, E>;
	unwrap(): T;
	unwrapOr<A>(v: A): T | A;
}

export interface PromiseLike<T> {
	/**
	 * Attaches callbacks for the resolution and/or rejection of the Promise.
	 * @param onfulfilled The callback to execute when the Promise is resolved.
	 * @param onrejected The callback to execute when the Promise is rejected.
	 * @returns A Promise for the completion of which ever callback is executed.
	 */
	then<Result1 = T, Result2 = never>(
		onfulfilled?:
			| ((value: T) => Result1 | PromiseLike<Result1>)
			| undefined
			| null,
		onrejected?: // biome-ignore lint/suspicious/noExplicitAny: Not need to type this
		((reason: any) => Result2 | PromiseLike<Result2>) | undefined | null,
	): PromiseLike<Result1 | Result2>;
}
