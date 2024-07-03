export const getRegExpFlags = (regExp: RegExp) => {
	const flags = [];

	if (regExp.global) {
		flags.push('g');
	}
	if (regExp.ignoreCase) {
		flags.push('i');
	}
	if (regExp.multiline) {
		flags.push('m');
	}
	if (regExp.sticky) {
		flags.push('y');
	}
	if (regExp.unicode) {
		flags.push('u');
	}

	return flags.join('');
};
