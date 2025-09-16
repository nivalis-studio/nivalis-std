import {
  RE_DETECT_JSON,
  RE_JSON_SIG,
  RE_SUSPECT_CONSTRUCTOR_PROTO,
  RE_SUSPECT_JSON_PROTO,
} from '../regexp/json';

/**
 * Safe JSON utility functions.
 */
export const SafeJson = {
  /**
   * Checks if a value can be safely stringified to JSON.
   * @param {unknown} value - The value to check.
   * @returns {boolean} True if the value can be stringified, false otherwise.
   */
  isStringifyable: (value: unknown): boolean => {
    try {
      JSON.stringify(value);

      return true;
    } catch {
      return false;
    }
  },

  /**
   * Checks if a value can be safely parsed from JSON.
   * @param {unknown} value - The value to check.
   * @returns {boolean} True if the value can be parsed, false otherwise.
   */
  isParsable: (value: unknown): boolean => {
    if (!value || typeof value !== 'string' || !RE_DETECT_JSON.test(value)) {
      return false;
    }

    try {
      JSON.parse(value);

      return true;
    } catch {
      return false;
    }
  },

  /**
   * Parses a JSON string with a fallback value.
   * @template T
   * @param {any} value - The value to parse.
   * @param {T} fallback - The fallback value if parsing fails.
   * @returns {T} The parsed value or the fallback.
   */
  parseOr: <T>(value: any, fallback: T): T => {
    if (typeof value !== 'string') {
      return value as T;
    }

    const _value = value.trim();

    if (
      _value.startsWith('"') &&
      _value.endsWith('"') &&
      !_value.includes('\\')
    ) {
      return _value.slice(1, -1) as T;
    }

    if (_value.length <= 9) {
      const _lval = _value.toLowerCase();

      // biome-ignore lint/style/useDefaultSwitchClause: handle all cases
      switch (_lval) {
        case 'true': {
          return true as T;
        }

        case 'false': {
          return false as T;
        }

        case 'undefined': {
          return undefined as T;
        }

        case 'null': {
          return null as T;
        }

        case 'nan': {
          return Number.NaN as T;
        }

        case 'infinity': {
          return Number.POSITIVE_INFINITY as T;
        }

        case '-infinity': {
          return Number.NEGATIVE_INFINITY as T;
        }
      }
    }

    if (!RE_JSON_SIG.test(value)) {
      console.error(new SyntaxError('[safeJson] Invalid JSON'));

      return fallback;
    }

    try {
      if (
        RE_SUSPECT_JSON_PROTO.test(value) ||
        RE_SUSPECT_CONSTRUCTOR_PROTO.test(value)
      ) {
        return JSON.parse(value, (key: string, val: any): any => {
          if (
            key === '__proto__' ||
            (key === 'constructor' &&
              val &&
              typeof val === 'object' &&
              'prototype' in val)
          ) {
            console.warn(
              `[safeJson] Dropping "${key}" key to prevent prototype pollution.`,
            );

            return;
          }

          return val;
        });
      }

      return JSON.parse(value) as T;
    } catch {
      console.error(new SyntaxError('[safeJson] Invalid JSON'));

      return fallback;
    }
  },
};
