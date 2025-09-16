import type { Exception } from '../exceptions';
import type { Result } from './result';

export { Err, err, fromThrowable, Ok, ok, safeTry } from './result';
export {
  errAsync,
  fromPromise,
  fromSafePromise,
  okAsync,
  ResultAsync,
} from './result-async';
export { wrap, wrapSync } from './wrap';
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
