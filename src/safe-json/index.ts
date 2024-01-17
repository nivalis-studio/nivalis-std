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
		if (!value) {
			return false;
		}

		try {
			JSON.parse(value as string);

			return true;
		} catch {
			return false;
		}
	},
};
