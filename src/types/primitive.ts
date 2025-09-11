/**
 * Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
 */
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionLike = (...args: readonly unknown[]) => any;
