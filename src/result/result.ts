/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { ResultAsync, errAsync } from './result-async';
import {
  combineResultList,
  combineResultListWithAllErrors,
} from './result-utils';
import type {
  ExtractErrTypes,
  ExtractOkTypes,
  InferErrTypes,
  InferOkTypes,
} from './result-utils';

export const ok = <T, E = never>(value: T): Ok<T, E> => new Ok(value);

export const err = <T = never, E = unknown>(err: E): Err<T, E> => new Err(err);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
  /**
   * Wraps a function with a try catch, creating a new function with the same
   * arguments but returning `Ok` if successful, `Err` if the function throws
   * @template Fn - The type of function.
   * @template E - The type of error.
   * @param {Fn} fn function to wrap with ok on success or err on failure
   * @param {(e: unknown) => E} errorFn when an error is thrown, this will wrap the error result if provided
   * @returns {(...args: Parameters<Fn>) => Result<ReturnType<Fn>, E>} A new function that wraps the original function with try catch.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function fromThrowable<Fn extends (...args: readonly any[]) => any, E>(
    fn: Fn,
    errorFn?: (e: unknown) => E,
  ): (...args: Parameters<Fn>) => Result<ReturnType<Fn>, E> {
    return (...args) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = fn(...args);

        return ok(result);
      } catch (error) {
        return err(errorFn ? errorFn(error) : (error as E));
      }
    };
  }

  export function combine<
    T extends readonly [
      Result<unknown, unknown>,
      ...Array<Result<unknown, unknown>>,
    ],
  >(resultList: T): CombineResults<T>;
  export function combine<T extends ReadonlyArray<Result<unknown, unknown>>>(
    resultList: T,
  ): CombineResults<T>;

  export function combine<
    T extends readonly [
      Result<unknown, unknown>,
      ...Array<Result<unknown, unknown>>,
    ],
  >(resultList: T): CombineResults<T> {
    return combineResultList(resultList) as CombineResults<T>;
  }

  export function combineWithAllErrors<
    T extends readonly [
      Result<unknown, unknown>,
      ...Array<Result<unknown, unknown>>,
    ],
  >(resultList: T): CombineResultsWithAllErrorsArray<T>;
  export function combineWithAllErrors<
    T extends ReadonlyArray<Result<unknown, unknown>>,
  >(resultList: T): CombineResultsWithAllErrorsArray<T>;

  export function combineWithAllErrors<
    T extends ReadonlyArray<Result<unknown, unknown>>,
  >(resultList: T): CombineResultsWithAllErrorsArray<T> {
    return combineResultListWithAllErrors(
      resultList,
    ) as CombineResultsWithAllErrorsArray<T>;
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Result<T, E> = Ok<T, E> | Err<T, E>;

/**
 * Evaluates the given generator to a Result returned or an Err yielded from it,
 * whichever comes first.
 *
 * This function, in combination with `Result.safeUnwrap()`, is intended to emulate
 * Rust's ? operator.
 * See `/tests/safeTry.test.ts` for examples.
 * @template T - The type of the result
 * @template E - The type of the error
 * @param {() => Generator<Err<never, E>, Result<T, E>>} body - What is evaluated. In body, `yield* result.safeUnwrap()` works as
 * Rust's `result?` expression.
 * @returns {Result<T, E>} The first occurence of either an yielded Err or a returned Result.
 */
export function safeTry<T, E>(
  body: () => Generator<Err<never, E>, Result<T, E>>,
): Result<T, E>;
/**
 * Evaluates the given generator to a Result returned or an Err yielded from it,
 * whichever comes first.
 *
 * This function, in combination with `Result.safeUnwrap()`, is intended to emulate
 * Rust's ? operator.
 * See `/tests/safeTry.test.ts` for examples.
 * @template T - The type of the result
 * @template E - The type of the error
 * @param {() => AsyncGenerator<Err<never, E>, Result<T, E>>} body - What is evaluated. In body, `yield* result.safeUnwrap()` and `yield* resultAsync.safeUnwrap()` work as Rust's `result?` expression.
 * @returns {Promise<Result<T, E>>} The first occurence of either an yielded Err or a returned Result.
 */
// NOTE:
// Since body is potentially throwable because `await` can be used in it,
// Promise<Result<T, E>>, not ResultAsync<T, E>, is used as the return type.
export function safeTry<T, E>(
  body: () => AsyncGenerator<Err<never, E>, Result<T, E>>,
): Promise<Result<T, E>>;

export function safeTry<T, E>(
  body:
    | (() => Generator<Err<never, E>, Result<T, E>>)
    | (() => AsyncGenerator<Err<never, E>, Result<T, E>>),
): Result<T, E> | Promise<Result<T, E>> {
  const next = body().next();

  if (next instanceof Promise) {
    return next.then(result => result.value);
  }

  return next.value;
}

interface IResult<T, E> {
  /**
   * Used to check if a `Result` is an `OK`
   * @returns `true` if the result is an `OK` variant of Result
   */
  isOk: () => this is Ok<T, E>;

  /**
   * Used to check if a `Result` is an `Err`
   * @returns `true` if the result is an `Err` variant of Result
   */
  isErr: () => this is Err<T, E>;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>`
   * by applying a function to a contained `Ok` value, leaving an `Err` value
   * untouched.
   * @param f The function to apply an `OK` value
   * @returns the result of applying `f` or an `Err` untouched
   */
  map: <A>(f: (t: T) => A) => Result<A, E>;

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a
   * contained `Err` value, leaving an `Ok` value untouched.
   *
   * This function can be used to pass through a successful result while
   * handling an error.
   * @param f a function to apply to the error `Err` value
   */
  mapErr: <U>(f: (e: E) => U) => Result<T, U>;

  /**
   * Similar to `map` Except you must return a new `Result`.
   *
   * This is useful for when you need to do a subsequent computation using the
   * inner `T` value, but that computation might fail.
   * Additionally, `andThen` is really useful as a tool to flatten a
   * `Result<Result<A, E2>, E1>` into a `Result<A, E2>` (see example below).
   * @param f The function to apply to the current value
   */
  andThen: (<R extends Result<unknown, unknown>>(
    f: (t: T) => R,
  ) => Result<InferOkTypes<R>, InferErrTypes<R> | E>) &
    (<U, F>(f: (t: T) => Result<U, F>) => Result<U, E | F>);

  /**
   * Takes an `Err` value and maps it to a `Result<T, SomeNewType>`.
   *
   * This is useful for error recovery.
   * @param f  A function to apply to an `Err` value, leaving `Ok` values
   * untouched.
   */
  orElse: (<R extends Result<unknown, unknown>>(
    f: (e: E) => R,
  ) => Result<T, InferErrTypes<R>>) &
    (<A>(f: (e: E) => Result<T, A>) => Result<T, A>);

  /**
   * Similar to `map` Except you must return a new `Result`.
   *
   * This is useful for when you need to do a subsequent async computation using
   * the inner `T` value, but that computation might fail. Must return a ResultAsync
   * @param f The function that returns a `ResultAsync` to apply to the current
   * value
   */
  asyncAndThen: <U, F>(f: (t: T) => ResultAsync<U, F>) => ResultAsync<U, E | F>;

  /**
   * Maps a `Result<T, E>` to `ResultAsync<U, E>`
   * by applying an async function to a contained `Ok` value, leaving an `Err`
   * value untouched.
   * @param f An async function to apply an `OK` value
   */
  asyncMap: <U>(f: (t: T) => Promise<U>) => ResultAsync<U, E>;

  /**
   * Unwrap the `Ok` value, or return the default if there is an `Err`
   * @param v the default value to return if there is an `Err`
   */
  unwrapOr: <A>(v: A) => T | A;

  /**
   *
   *Given 2 functions (one for the `Ok` variant and one for the `Err` variant)
   *execute the function that matches the `Result` variant.
   *
   *Match callbacks do not necessitate to return a `Result`, however you can
   *return a `Result` if you want to.
   *
   *`match` is like chaining `map` and `mapErr`, with the distinction that
   *with `match` both functions must have the same return type.
   * @param ok
   * @param err
   */
  match: <A>(ok: (t: T) => A, err: (e: E) => A) => A;

  /**
   * Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
   */
  safeUnwrap: () => Generator<Err<never, E>, T>;

  /**
   * **This method is unsafe, and should only be used in a test environments**
   *
   * Takes a `Result<T, E>` and returns a `T` when the result is an `Ok`, otherwise it throws a custom object.
   * @param config
   */
  _unsafeUnwrap: () => T;

  /**
   * Used to check if a `Result` has been handled properly.
   */
  [Symbol.dispose]: () => void;
}

export class Ok<T, E> implements IResult<T, E> {
  private handled = false;
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    this.handled = true;

    return true;
  }

  isErr(): this is Err<T, E> {
    this.handled = true;

    return !this.isOk();
  }

  map<A>(callback: (t: T) => A): Result<A, E> {
    this.handled = true;

    return ok(callback(this.value));
  }

  [Symbol.dispose](): void {
    if (!this.handled) {
      throw new Error('Result was not handled properly');
    }
  }

  mapErr<U>(_f: (e: E) => U): Result<T, U> {
    this.handled = true;

    return ok(this.value);
  }

  andThen<R extends Result<unknown, unknown>>(
    callback: (t: T) => R,
  ): Result<InferOkTypes<R>, InferErrTypes<R> | E>;
  andThen<U, F>(callback: (t: T) => Result<U, F>): Result<U, E | F>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  andThen(callback: any): any {
    this.handled = true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return callback(this.value);
  }

  orElse<R extends Result<unknown, unknown>>(
    _callback: (e: E) => R,
  ): Result<T, InferErrTypes<R>>;
  orElse<A>(_callback: (e: E) => Result<T, A>): Result<T, A>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orElse(_callback: any): any {
    this.handled = true;

    return ok(this.value);
  }

  asyncAndThen<U, F>(
    callback: (t: T) => ResultAsync<U, F>,
  ): ResultAsync<U, E | F> {
    this.handled = true;

    return callback(this.value);
  }

  asyncMap<U>(callback: (t: T) => Promise<U>): ResultAsync<U, E> {
    this.handled = true;

    return ResultAsync.fromSafePromise(callback(this.value));
  }

  unwrapOr<A>(_fallbackValue: A): T | A {
    this.handled = true;

    return this.value;
  }

  match<A>(callback: (t: T) => A, _err: (e: E) => A): A {
    this.handled = true;

    return callback(this.value);
  }

  safeUnwrap(): Generator<Err<never, E>, T> {
    this.handled = true;
    const value = this.value;

    /* eslint-disable-next-line require-yield, func-names */
    return (function* () {
      return value;
    })();
  }

  _unsafeUnwrap(): T {
    this.handled = true;

    return this.value;
  }
}

export class Err<T, E> implements IResult<T, E> {
  private handled = false;
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    this.handled = true;

    return false;
  }

  isErr(): this is Err<T, E> {
    this.handled = true;

    return !this.isOk();
  }

  [Symbol.dispose](): void {
    if (!this.handled) {
      throw new Error('Result was not handled properly');
    }
  }

  map<A>(_callback: (t: T) => A): Result<A, E> {
    this.handled = true;

    return err(this.error);
  }

  mapErr<U>(callback: (e: E) => U): Result<T, U> {
    this.handled = true;

    return err(callback(this.error));
  }

  andThen<R extends Result<unknown, unknown>>(
    _callback: (t: T) => R,
  ): Result<InferOkTypes<R>, InferErrTypes<R> | E>;
  andThen<U, F>(_callback: (t: T) => Result<U, F>): Result<U, E | F>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  andThen(_callback: any): any {
    this.handled = true;

    return err(this.error);
  }

  orElse<R extends Result<unknown, unknown>>(
    callback: (e: E) => R,
  ): Result<T, InferErrTypes<R>>;
  orElse<A>(callback: (e: E) => Result<T, A>): Result<T, A>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orElse(callback: any): any {
    this.handled = true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return callback(this.error);
  }

  asyncAndThen<U, F>(
    _callback: (t: T) => ResultAsync<U, F>,
  ): ResultAsync<U, E | F> {
    this.handled = true;

    return errAsync<U, E>(this.error);
  }

  asyncMap<U>(_callback: (t: T) => Promise<U>): ResultAsync<U, E> {
    this.handled = true;

    return errAsync<U, E>(this.error);
  }

  unwrapOr<A>(fallbackValue: A): T | A {
    this.handled = true;

    return fallbackValue;
  }

  match<A>(_ok: (t: T) => A, err: (e: E) => A): A {
    this.handled = true;

    return err(this.error);
  }

  safeUnwrap(): Generator<Err<never, E>, T> {
    this.handled = true;
    const error = this.error;

    // eslint-disable-next-line func-names
    return (function* () {
      yield err(error);

      throw new Error('Do not use this generator out of `safeTry`');
    })();
  }

  _unsafeUnwrap(): T {
    this.handled = true;
    throw this.error as Error;
  }
}

export const fromThrowable = Result.fromThrowable;

// #region Combine - Types

// This is a helper type to prevent infinite recursion in typing rules.
//
// Use this with your `depth` variable in your types.
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  ...Array<0>,
];

// Collects the results array into separate tuple array.
//
// T         - The array of the results
// Collected - The collected tuples.
// Depth     - The maximum depth.
type CollectResults<
  T,
  Collected extends unknown[] = [],
  Depth extends number = 50,
> = [Depth] extends [never]
  ? []
  : T extends [infer H, ...infer Rest]
    ? // And test whether the head of the list is a result
      H extends Result<infer L, infer R>
      ? // Continue collecting...
        CollectResults<
          // the rest of the elements
          Rest,
          // The collected
          [...Collected, [L, R]],
          // and one less of the current depth
          Prev[Depth]
        >
      : never // Impossible
    : Collected;

// Transposes an array
//
// A          - The array source
// Transposed - The collected transposed array
// Depth      - The maximum depth.
export type Transpose<
  A,
  Transposed extends unknown[][] = [],
  Depth extends number = 10,
> = A extends [infer T, ...infer Rest]
  ? T extends [infer L, infer R]
    ? Transposed extends [infer PL, infer PR]
      ? PL extends unknown[]
        ? PR extends unknown[]
          ? Transpose<Rest, [[...PL, L], [...PR, R]], Prev[Depth]>
          : never
        : never
      : Transpose<Rest, [[L], [R]], Prev[Depth]>
    : Transposed
  : Transposed;

// Combines the both sides of the array of the results into a tuple of the
// union of the ok types and the union of the err types.
//
// T     - The array of the results
// Depth - The maximum depth.
export type Combine<T, Depth extends number = 5> =
  Transpose<CollectResults<T>, [], Depth> extends [infer L, infer R]
    ? [UnknownMembersToNever<L>, UnknownMembersToNever<R>]
    : Transpose<CollectResults<T>, [], Depth> extends []
      ? [[], []]
      : never;

// Deduplicates the result, as the result type is a union of Err and Ok types.
export type Dedup<T> =
  T extends Result<infer RL, infer RR>
    ? [unknown] extends [RL]
      ? Err<RL, RR>
      : Ok<RL, RR>
    : T;

// Given a union, this gives the array of the union members.
export type MemberListOf<T> = (
  (T extends unknown ? (t: T) => T : never) extends infer U
    ? (U extends unknown ? (u: U) => unknown : never) extends (
        v: infer V,
      ) => unknown
      ? V
      : never
    : never
) extends (_: unknown) => infer W
  ? [...MemberListOf<Exclude<T, W>>, W]
  : [];

// Converts an empty array to never.
//
// The second type parameter here will affect how to behave to `never[]`s.
// If a precise type is required, pass `1` here so that it will resolve
// a literal array such as `[ never, never ]`. Otherwise, set `0` or the default
// type value will cause this to resolve the arrays containing only `never`
// items as `never` only.
export type EmptyArrayToNever<
  T,
  NeverArrayToNever extends number = 0,
> = T extends []
  ? never
  : NeverArrayToNever extends 1
    ? T extends [never, ...infer Rest]
      ? [EmptyArrayToNever<Rest>] extends [never]
        ? never
        : T
      : T
    : T;

// Converts the `unknown` items of an array to `never`s.
type UnknownMembersToNever<T> = T extends [infer H, ...infer R]
  ? [[unknown] extends [H] ? never : H, ...UnknownMembersToNever<R>]
  : T;

// Gets the member type of the array or never.
export type MembersToUnion<T> = T extends unknown[] ? T[number] : never;

// Checks if the given type is a literal array.
export type IsLiteralArray<T> = T extends { length: infer L }
  ? L extends number
    ? number extends L
      ? 0
      : 1
    : 0
  : 0;

// Traverses an array of results and returns a single result containing
// the oks and errs union-ed/combined.
type Traverse<T, Depth extends number = 5> =
  Combine<T, Depth> extends [infer Oks, infer Errs]
    ? Result<EmptyArrayToNever<Oks, 1>, MembersToUnion<Errs>>
    : never;

// Traverses an array of results and returns a single result containing
// the oks combined and the array of errors combined.
type TraverseWithAllErrors<T, Depth extends number = 5> =
  Combine<T, Depth> extends [infer Oks, infer Errs]
    ? Result<EmptyArrayToNever<Oks>, EmptyArrayToNever<Errs>>
    : never;

// Combines the array of results into one result.
export type CombineResults<T extends ReadonlyArray<Result<unknown, unknown>>> =
  IsLiteralArray<T> extends 1
    ? Traverse<T>
    : Result<ExtractOkTypes<T>, ExtractErrTypes<T>[number]>;

// Combines the array of results into one result with all errors.
export type CombineResultsWithAllErrorsArray<
  T extends ReadonlyArray<Result<unknown, unknown>>,
> =
  IsLiteralArray<T> extends 1
    ? TraverseWithAllErrors<T>
    : Result<ExtractOkTypes<T>, Array<ExtractErrTypes<T>[number]>>;

// #endregion
