export const getRegExpFlags = (regExp: RegExp) => {
	const flags = [];
	regExp.global && flags.push('g');
	regExp.ignoreCase && flags.push('i');
	regExp.multiline && flags.push('m');
	regExp.sticky && flags.push('y');
	regExp.unicode && flags.push('u');
	return flags.join('');
};
