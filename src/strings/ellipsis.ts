export const ellipsis = (str: string, max?: number, end?: string): string => {
	if (!max || str.length <= max) {
		return str;
	}

	let _end = end;
	if (!_end) {
		_end = '…';
	}

	const sliced = str.slice(0, Math.max(0, max - _end.length) + 1);
	const lastSpace = Math.max(0, sliced.lastIndexOf(' '));
	return sliced.slice(0, lastSpace) + end;
};
