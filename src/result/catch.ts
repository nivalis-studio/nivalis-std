import type {ExceptionConstructor} from '../exceptions';
import {err} from './result';
import {ok} from './result';
import type {Result} from './result';

/**
 * Wraps an `async` function with a try catch, creating a new function with the same
 * arguments but returning `Ok` if successful, `Err` if the function throws
 *
 * @param fn function to wrap with ok on success or err on failure
 * @param errorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrap =
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<Fn extends (...args: readonly any[]) => Promise<any>, E extends Error>(
			fn: Fn,
			errorConstructor?: ErrorConstructor | ExceptionConstructor,
		): ((
			...args: Parameters<Fn>
		) => Promise<Result<Awaited<ReturnType<Fn>>, E>>) =>
		async (...args: Parameters<Fn>) => {
			try {
				const result = await fn(...args);
				return ok(result);
			} catch (error) {
				return err(
					errorConstructor
						? (new errorConstructor((error as Error).message, {
								cause: error,
						  }) as unknown as E)
						: (error as E),
				);
			}
		};

/**
 * Wraps a function with a try catch, creating a new function with the same
 * arguments but returning `Ok` if successful, `Err` if the function throws
 *
 * @param fn function to wrap with ok on success or err on failure
 * @param errorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrapSync =
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<Fn extends (...args: readonly any[]) => any, E extends Error>(
			fn: Fn,
			errorConstructor?: ErrorConstructor | ExceptionConstructor,
		): ((...args: Parameters<Fn>) => Result<ReturnType<Fn>, E>) =>
		(...args: Parameters<Fn>) => {
			try {
				const result = fn(...args);
				return ok(result);
			} catch (error) {
				return err(
					errorConstructor
						? (new errorConstructor((error as Error).message, {
								cause: error,
						  }) as unknown as E)
						: (error as E),
				);
			}
		};
