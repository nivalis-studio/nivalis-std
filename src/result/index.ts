import type { Exception } from '../exceptions';
import type { Result } from './result';

export { ok, Ok, err, Err, fromThrowable, safeTry } from './result';
export { wrap, wrapSync } from './wrap';
export {
  ResultAsync,
  okAsync,
  errAsync,
  fromPromise,
  fromSafePromise,
} from './result-async';
export type { Result } from './result';

export const valuesFromResults = <T, E>(results: Array<Result<T, E>>): T[] => {
  const values = [];

  for (const result of results) {
    if (result.isOk()) {
      values.push(result.value);
    }
  }

  return values;
};

export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (result.isOk()) {
    return result.value;
  }

  throw result.error as Exception;
};
