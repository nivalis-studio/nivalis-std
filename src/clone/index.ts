import { constructorName } from '../constructor-name';
import { getRegExpFlags } from '../regexp';

export const clone = <T>(obj: T): T => {
	let result = obj;
	const type = constructorName(obj);

	if (type === 'Set') {
		return new Set(
			[...(obj as Set<unknown>)].map((value) => clone(value)),
		) as T;
	}
	if (type === 'Map') {
		return new Map(
			[...(obj as Map<unknown, unknown>)].map(
				(kv) => [clone(kv[0]), clone(kv[1])] as const,
			),
		) as T;
	}

	if (type === 'Date') {
		return new Date((obj as Date).getTime()) as T;
	}

	if (type === 'RegExp') {
		return RegExp((obj as RegExp).source, getRegExpFlags(obj as RegExp)) as T;
	}

	if (type === 'Array' || type === 'Object') {
		result = (Array.isArray(obj) ? [] : {}) as T;
		for (const key in obj) {
			// include prototype properties
			result[key] = clone(obj[key]);
		}
	}

	// primitives and non-supported objects (e.g. functions) land here
	return result;
};
