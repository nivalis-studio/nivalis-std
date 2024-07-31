import { UnknownException } from '../exceptions';
import { err, ok } from './result';
import type { Exception, ExceptionConstructor } from '../exceptions';
import type { Result } from './result';

/**
 * Wraps an `async` function with a try catch, creating a new function with the same
 * arguments but returning `Ok` if successful, `Err` if the function throws
 * @param fn function to wrap with ok on success or err on failure
 * @param ErrorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrap =
  <Args extends any[], Ret>(
    fn: (...args: Args) => Promise<Ret>,
    ErrorConstructor?: ExceptionConstructor,
  ): ((...args: Args) => Promise<Result<Ret, Exception>>) =>
  async (...args: Args) => {
    try {
      const result = await fn(...args);

      return ok(result);
    } catch (error_: unknown) {
      const error = error_ as Error | Exception;

      if ('__exception' in error && error.__exception) {
        error.addMeta({ args });

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
 * @param fn function to wrap with ok on success or err on failure
 * @param ErrorConstructor optional `ErrorConstructor`, defaults to `Error`
 */
export const wrapSync =
  <Args extends any[], Ret>(
    fn: (...args: Args) => Ret,
    ErrorConstructor?: ExceptionConstructor,
  ): ((...args: Args) => Result<Ret, Exception>) =>
  (...args: Args): Result<Ret, Exception> => {
    try {
      const result = fn(...args);

      return ok(result);
    } catch (error_: unknown) {
      const error = error_ as Error | Exception;

      if ('__exception' in error && error.__exception) {
        error.addMeta({ args });

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
