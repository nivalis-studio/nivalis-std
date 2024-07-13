import { UnknownException } from '../exceptions';
import type { Exception, ExceptionConstructor } from '../exceptions';
import { err, ok } from './result';
import type { Result } from './result';

/**
 * Wraps an `async` function with a try catch, creating a new function with the same
 * arguments but returning `Ok` if successful, `Err` if the function throws
 *
 * @param fn function to wrap with ok on success or err on failure
 * @param ErrorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrap =
	<Fn extends (...args: readonly any[]) => Promise<any>>(
		fn: Fn,
		ErrorConstructor?: ErrorConstructor | ExceptionConstructor,
	): ((
		...args: Parameters<Fn>
	) => Promise<Result<Awaited<ReturnType<Fn>>, Exception>>) =>
	async (...args: Parameters<Fn>) => {
		try {
			// eslint-disable-next-line ts/no-unsafe-assignment
			const result = await fn(...args);

			return ok(result);
		} catch (error_: unknown) {
			const error = error_ as Error | Exception;

			if ('__exception' in error && error.__exception) {
				error.meta = {
					...error.meta,
					args,
				};

				return err(error);
			}

			return err(
				ErrorConstructor
					? (new ErrorConstructor(error.message, {
							cause: error,
							meta: { args },
						}) as unknown as Exception)
					: (new UnknownException(error.message, {
							cause: error,
							meta: { args },
						}) as unknown as Exception),
			);
		}
	};

/**
 * Wraps a function with a try catch, creating a new function with the same
 * arguments but returning `Ok` if successful, `Err` if the function throws
 *
 * @param fn function to wrap with ok on success or err on failure
 * @param ErrorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrapSync =
	<Fn extends (...args: readonly any[]) => any>(
		fn: Fn,
		ErrorConstructor?: ErrorConstructor | ExceptionConstructor,
	): ((...args: Parameters<Fn>) => Result<ReturnType<Fn>, Exception>) =>
	(...args: Parameters<Fn>) => {
		try {
			// eslint-disable-next-line ts/no-unsafe-assignment
			const result = fn(...args);

			return ok(result);
		} catch (error_: unknown) {
			const error = error_ as Error | Exception;

			if ('__exception' in error && error.__exception) {
				error.meta = {
					...error.meta,
					args,
				};

				return err(error);
			}

			return err(
				ErrorConstructor
					? (new ErrorConstructor(error.message, {
							cause: error,
							meta: { args },
						}) as unknown as Exception)
					: (new UnknownException(error.message, {
							cause: error,
							meta: { args },
						}) as unknown as Exception),
			);
		}
	};
