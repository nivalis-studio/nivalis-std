const DETECT_JSON = /^\s*[{["\-\d]/;

export const SafeJson = {
	isStringifyable: (value: unknown) => {
		try {
			JSON.stringify(value);

			return true;
		} catch {
			return false;
		}
	},

	isParsable: (value: unknown) => {
		if (!value || typeof value !== 'string' || !DETECT_JSON.test(value)) {
			return false;
		}

		try {
			JSON.parse(value);

			return true;
		} catch {
			return false;
		}
	},

	parseOr: <T>(value: unknown, fallback: T): T => {
		if (!SafeJson.isParsable(value)) {
			return fallback;
		}

		return JSON.parse(value as string) as T;
	},
};
