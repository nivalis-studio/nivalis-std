/**
 * @deprecated use `import { nonNullable } from '@nivalis/std/predicates';`
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> =>
	value !== null && value !== undefined;
