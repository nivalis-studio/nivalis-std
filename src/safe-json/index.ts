// biome-ignore lint/suspicious/noExplicitAny: user type
const parse = <T = unknown>(json: any): T => {
	try {
		const val: T = JSON.parse(json);
		return val;
	} catch {
		return json;
	}
};

const isJsonStringifyable = (value: unknown) => {
	try {
		JSON.stringify(value);

		return true;
	} catch {
		return false;
	}
};

const isJsonParsable = (value: unknown) => {
	if (!value) {
		return false;
	}

	try {
		JSON.parse(value as string);

		return true;
	} catch {
		return false;
	}
};

export const SafeJson = {
	isStringifyable: isJsonStringifyable,
	isParsable: isJsonParsable,
	parse,
};
