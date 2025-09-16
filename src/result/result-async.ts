/** biome-ignore-all lint/nursery/noShadow: okay-ish */
/** biome-ignore-all lint/style/useReadonlyClassProperties: okay-ish */
/** biome-ignore-all lint/suspicious/noThenProperty: okay-ish */
/** biome-ignore-all lint/suspicious/useAwait: okay-ish */
import { Err, Ok } from './result';
import {
  combineResultAsyncList,
  combineResultAsyncListWithAllErrors,
} from './result-utils';
import type {
  Combine,
  Dedup,
  EmptyArrayToNever,
  IsLiteralArray,
  MemberListOf,
  MembersToUnion,
  Result,
} from './result';
import type {
  ExtractErrAsyncTypes,
  ExtractOkAsyncTypes,
  InferAsyncErrTypes,
  InferAsyncOkTypes,
  InferErrTypes,
  InferOkTypes,
} from './result-utils';

export class ResultAsync<T, E> implements PromiseLike<Result<T, E>> {
  private _promise: Promise<Result<T, E>>;

  constructor(res: Promise<Result<T, E>>) {
    this._promise = res;
  }

  static fromSafePromise<T, E = never>(
    promise: PromiseLike<T>,
  ): ResultAsync<T, E>;
  static fromSafePromise<T, E = never>(promise: Promise<T>): ResultAsync<T, E> {
    const newPromise = promise.then((value: T) => new Ok<T, E>(value));

    return new ResultAsync(newPromise);
  }

  static fromPromise<T, E>(
    promise: PromiseLike<T>,
    errorFn: (e: unknown) => E,
  ): ResultAsync<T, E>;
  static fromPromise<T, E>(
    promise: Promise<T>,
    errorFn: (e: unknown) => E,
  ): ResultAsync<T, E> {
    const newPromise = promise
      .then((value: T) => new Ok<T, E>(value))
      .catch(error => new Err<T, E>(errorFn(error)));

    return new ResultAsync(newPromise);
  }

  static combine<
    T extends readonly [
      ResultAsync<unknown, unknown>,
      ...Array<ResultAsync<unknown, unknown>>,
    ],
  >(asyncResultList: T): CombineResultAsyncs<T>;
  static combine<T extends ReadonlyArray<ResultAsync<unknown, unknown>>>(
    asyncResultList: T,
  ): CombineResultAsyncs<T>;
  static combine<T extends ReadonlyArray<ResultAsync<unknown, unknown>>>(
    asyncResultList: T,
  ): CombineResultAsyncs<T> {
    return combineResultAsyncList(
      asyncResultList,
    ) as unknown as CombineResultAsyncs<T>;
  }

  static combineWithAllErrors<
    T extends readonly [
      ResultAsync<unknown, unknown>,
      ...Array<ResultAsync<unknown, unknown>>,
    ],
  >(asyncResultList: T): CombineResultsWithAllErrorsArrayAsync<T>;
  static combineWithAllErrors<
    T extends ReadonlyArray<ResultAsync<unknown, unknown>>,
  >(asyncResultList: T): CombineResultsWithAllErrorsArrayAsync<T>;
  static combineWithAllErrors<
    T extends ReadonlyArray<ResultAsync<unknown, unknown>>,
  >(asyncResultList: T): CombineResultsWithAllErrorsArrayAsync<T> {
    return combineResultAsyncListWithAllErrors(
      asyncResultList,
    ) as CombineResultsWithAllErrorsArrayAsync<T>;
  }

  map<A>(f: (t: T) => A | Promise<A>): ResultAsync<A, E> {
    return new ResultAsync(
      this._promise.then(async (res: Result<T, E>) => {
        if (res.isErr()) {
          return new Err<A, E>(res.error);
        }

        return new Ok<A, E>(await f(res.value));
      }),
    );
  }

  mapErr<U>(f: (e: E) => U | Promise<U>): ResultAsync<T, U> {
    return new ResultAsync(
      this._promise.then(async (res: Result<T, E>) => {
        if (res.isOk()) {
          return new Ok<T, U>(res.value);
        }

        return new Err<T, U>(await f(res.error));
      }),
    );
  }

  andThen<R extends Result<unknown, unknown>>(
    f: (t: T) => R,
  ): ResultAsync<InferOkTypes<R>, InferErrTypes<R> | E>;
  andThen<R extends ResultAsync<unknown, unknown>>(
    f: (t: T) => R,
  ): ResultAsync<InferAsyncOkTypes<R>, InferAsyncErrTypes<R> | E>;
  andThen<U, F>(
    f: (t: T) => Result<U, F> | ResultAsync<U, F>,
  ): ResultAsync<U, E | F>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  andThen(f: any): any {
    return new ResultAsync(
      this._promise.then(res => {
        if (res.isErr()) {
          return new Err<never, E>(res.error);
        }

        const newValue = f(res.value);

        return newValue instanceof ResultAsync ? newValue._promise : newValue;
      }),
    );
  }

  orElse<R extends Result<T, unknown>>(
    f: (e: E) => R,
  ): ResultAsync<T, InferErrTypes<R>>;
  orElse<R extends ResultAsync<T, unknown>>(
    f: (e: E) => R,
  ): ResultAsync<T, InferAsyncErrTypes<R>>;
  orElse<A>(f: (e: E) => Result<T, A> | ResultAsync<T, A>): ResultAsync<T, A>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orElse(f: any): any {
    return new ResultAsync(
      this._promise.then(async (res: Result<T, E>) => {
        if (res.isErr()) {
          return f(res.error);
        }

        return new Ok<T, unknown>(res.value);
      }),
    );
  }

  async match<A>(ok: (t: T) => A, _err: (e: E) => A): Promise<A> {
    return await this._promise.then(res => res.match(ok, _err));
  }

  async unwrapOr<A>(t: A): Promise<T | A> {
    return await this._promise.then(res => res.unwrapOr(t));
  }

  /**
   * Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
   */
  async *safeUnwrap(): AsyncGenerator<Err<never, E>, T> {
    return yield* await this._promise.then(res => res.safeUnwrap());
  }

  // Makes ResultAsync implement PromiseLike<Result>
  then<A, B>(
    successCallback?: (res: Result<T, E>) => A | PromiseLike<A>,
    failureCallback?: (reason: unknown) => B | PromiseLike<B>,
  ): PromiseLike<A | B> {
    return this._promise.then(successCallback, failureCallback);
  }
}

export const okAsync = <T, E = never>(value: T): ResultAsync<T, E> =>
  new ResultAsync(Promise.resolve(new Ok<T, E>(value)));

export const errAsync = <T = never, E = unknown>(err: E): ResultAsync<T, E> =>
  new ResultAsync(Promise.resolve(new Err<T, E>(err)));

export const fromPromise = ResultAsync.fromPromise;
export const fromSafePromise = ResultAsync.fromSafePromise;

// Combines the array of async results into one result.
export type CombineResultAsyncs<
  T extends ReadonlyArray<ResultAsync<unknown, unknown>>,
> = IsLiteralArray<T> extends 1
  ? TraverseAsync<UnwrapAsync<T>>
  : ResultAsync<ExtractOkAsyncTypes<T>, ExtractErrAsyncTypes<T>[number]>;

// Combines the array of async results into one result with all errors.
export type CombineResultsWithAllErrorsArrayAsync<
  T extends ReadonlyArray<ResultAsync<unknown, unknown>>,
> = IsLiteralArray<T> extends 1
  ? TraverseWithAllErrorsAsync<UnwrapAsync<T>>
  : ResultAsync<ExtractOkAsyncTypes<T>, Array<ExtractErrAsyncTypes<T>[number]>>;

// Unwraps the inner `Result` from a `ResultAsync` for all elements.
type UnwrapAsync<T> = IsLiteralArray<T> extends 1
  ? Writable<T> extends [infer H, ...infer Rest]
    ? H extends PromiseLike<infer HI>
      ? HI extends Result<unknown, unknown>
        ? [Dedup<HI>, ...UnwrapAsync<Rest>]
        : never
      : never
    : []
  : // If we got something too general such as ResultAsync<X, Y>[] then we
    // simply need to map it to ResultAsync<X[], Y[]>. Yet `ResultAsync`
    // itself is a union therefore it would be enough to cast it to Ok.
    T extends Array<infer A>
    ? A extends PromiseLike<infer HI>
      ? HI extends Result<infer L, infer R>
        ? Array<Ok<L, R>>
        : never
      : never
    : never;

// Traverse through the tuples of the async results and create one
// `ResultAsync` where the collected tuples are merged.
type TraverseAsync<T, Depth extends number = 5> = IsLiteralArray<T> extends 1
  ? Combine<T, Depth> extends [infer Oks, infer Errs]
    ? ResultAsync<EmptyArrayToNever<Oks>, MembersToUnion<Errs>>
    : never
  : // The following check is important if we somehow reach to the point of
    // checking something similar to ResultAsync<X, Y>[]. In this case we don't
    // know the length of the elements, therefore we need to traverse the X and Y
    // in a way that the result should contain X[] and Y[].
    T extends Array<infer I>
    ? // The MemberListOf<I> here is to include all possible types. Therefore
      // if we face (ResultAsync<X, Y> | ResultAsync<A, B>)[] this type should
      // handle the case.
      Combine<MemberListOf<I>, Depth> extends [infer Oks, infer Errs]
      ? // The following `extends unknown[]` checks are just to satisfy the TS.
        // we already expect them to be an array.
        Oks extends unknown[]
        ? Errs extends unknown[]
          ? ResultAsync<
              EmptyArrayToNever<Array<Oks[number]>>,
              MembersToUnion<Array<Errs[number]>>
            >
          : ResultAsync<EmptyArrayToNever<Array<Oks[number]>>, Errs>
        : // The rest of the conditions are to satisfy the TS and support
          // the edge cases which are not really expected to happen.
          Errs extends unknown[]
          ? ResultAsync<Oks, MembersToUnion<Array<Errs[number]>>>
          : ResultAsync<Oks, Errs>
      : never
    : never;

// This type is similar to the `TraverseAsync` while the errors are also
// collected in order. For the checks/conditions made here, see that type
// for the documentation.
type TraverseWithAllErrorsAsync<
  T,
  Depth extends number = 5,
> = IsLiteralArray<T> extends 1
  ? Combine<T, Depth> extends [infer Oks, infer Errs]
    ? ResultAsync<EmptyArrayToNever<Oks>, EmptyArrayToNever<Errs>>
    : never
  : Writable<T> extends Array<infer I>
    ? Combine<MemberListOf<I>, Depth> extends [infer Oks, infer Errs]
      ? Oks extends unknown[]
        ? Errs extends unknown[]
          ? ResultAsync<
              EmptyArrayToNever<Array<Oks[number]>>,
              EmptyArrayToNever<Array<Errs[number]>>
            >
          : ResultAsync<EmptyArrayToNever<Array<Oks[number]>>, Errs>
        : Errs extends unknown[]
          ? ResultAsync<Oks, EmptyArrayToNever<Array<Errs[number]>>>
          : ResultAsync<Oks, Errs>
      : never
    : never;

// Converts a reaodnly array into a writable array
type Writable<T> = T extends readonly unknown[] ? [...T] : T;
