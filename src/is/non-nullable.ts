/**
 * Filter elements that are null or undefined.
 * @template T - The type of the value
 * @param {T} value - The value to filter
 * @returns {value is NonNullable<T>} true if value is not null or undefined
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const fieldNonNullable =
  <Rec extends { [key: string]: unknown }, Key extends keyof Rec>(field: Key) =>
  (
    value: Rec,
  ): value is NonNullable<
    Rec & {
      [K in Key]-?: Exclude<NonNullable<Rec[K]>, undefined>;
    }
  > => {
    return value?.[field] !== null && value?.[field] !== undefined;
  };
