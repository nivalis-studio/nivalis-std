import type {Err} from './err';
import type {Ok} from './ok';

export type Result<T, E> = Ok<T, E> | Err<T, E>;

export interface ResultInterface<T, E> {
	value: T | E;
	isOk(): this is Ok<T, E>;
	isErr(): this is Err<T, E>;
	unwrap(): T;
	unwrapOr<A>(v: A): T | A;
}
