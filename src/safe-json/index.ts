import {
	RE_DETECT_JSON,
	RE_JSON_SIG,
	RE_SUSPECT_CONSTRUCTOR_PROTO,
	RE_SUSPECT_JSON_PROTO,
} from '../regexp';

/**
 * Safe JSON utility functions.
 */
export const SafeJson = {
	/**
	 * Checks if a value can be safely stringified to JSON.
	 * @param value - The value to check.
	 * @returns True if the value can be stringified, false otherwise.
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
	 * @param value - The value to check.
	 * @returns True if the value can be parsed, false otherwise.
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
	 * @param value - The value to parse.
	 * @param fallback - The fallback value if parsing fails.
	 * @returns The parsed value or the fallback.
	 */
	// biome-ignore lint/suspicious/noExplicitAny: we want to allow any here
	parseOr: <T>(value: any, fallback: T): T => {
		if (typeof value !== 'string') {
			return value as T;
		}

		const _value = value.trim();
		if (_value[0] === '"' && _value.endsWith('"') && !_value.includes('\\')) {
			return _value.slice(1, -1) as T;
		}

		if (_value.length <= 9) {
			const _lval = _value.toLowerCase();
			switch (_lval) {
				case 'true':
					return true as T;
				case 'false':
					return false as T;
				case 'undefined':
					return undefined as T;
				case 'null':
					return null as T;
				case 'nan':
					return Number.NaN as T;
				case 'infinity':
					return Number.POSITIVE_INFINITY as T;
				case '-infinity':
					return Number.NEGATIVE_INFINITY as T;
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
				console.error(new Error('[safeJson] Possible prototype pollution'));
				// biome-ignore lint/suspicious/noExplicitAny: we want to allow any here
				return JSON.parse(value, (key: string, value: any): any => {
					if (
						key === '__proto__' ||
						(key === 'constructor' &&
							value &&
							typeof value === 'object' &&
							'prototype' in value)
					) {
						console.warn(
							`[safeJson] Dropping "${key}" key to prevent prototype pollution.`,
						);
						return;
					}
					return value;
				});
			}

			return JSON.parse(value);
		} catch (error) {
			console.error(error);
			return fallback;
		}
	},
};
