export const EARTH_RADIUS_IN_METERS = 6_378_137 as const;

export const NS_IN_SECOND = 1e9 as const;
export const NS_IN_MS = 1e6 as const;
export const MS_IN_SECOND = 1000 as const;
export const MS_IN_MINUTE = 60_000 as const;
export const MS_IN_HOUR = 3_600_000 as const;
export const MS_IN_DAY = 86_400_000 as const;
export const MS_IN_WEEK = 604_800_000 as const;

export const SECONDS_IN_MINUTE = 60 as const;
export const SECONDS_IN_HOUR = 3600 as const;
export const SECONDS_IN_DAY = 86_400 as const;
export const SECONDS_IN_WEEK = 604_800 as const;

export const MINUTES_IN_HOUR = 60 as const;
export const MINUTES_IN_DAY = 1440 as const;
export const MINUTES_IN_WEEK = 10_080 as const;

export const HOURS_IN_DAY = 24 as const;
export const HOURS_IN_WEEK = 168 as const;

/**
 * ```tex
 * π / 180.0
 * ```
 */
export const PI_DIV_180 = 1.745_329_251_994_329_5e-2 as const;

/**
 * ```tex
 * 180.0 / π
 * ```
 */
export const CONST_180_DIV_PI = 57.295_779_513_082_32 as const;

/**
 * Maximum length of a generic array.
 *
 * ```tex
 * 2^{32} - 1
 * ```
 */
export const MAX_ARRAY_LENGTH = 4_294_967_295 >>> 0;

/**
 * Maximum length of a typed array.
 *
 * ```tex
 * 2^{53} - 1
 * ```
 */
export const MAX_TYPED_ARRAY_LENGTH = 9_007_199_254_740_991 as const;
