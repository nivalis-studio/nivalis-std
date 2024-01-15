const urlAlphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export const generateId = (size = 21, alphabet = urlAlphabet) => {
	let code = '';
	let idx = size;

	while (idx--) {
		code += alphabet[(Math.random() * alphabet.length) | 0];
	}

	return code;
};

export const generateRandomChar = (len = 6) =>
	generateId(len, '123456789ACEFHJKLMNPRTUVWXY');

/**
 * Get a random ex: 637283
 * @param len Number of digits (default 6)
 * @returns string value
 */
export const generateRandomNumber = (len = 6) =>
	(Math.floor(Math.random() * (9 * (10 ^ len))) + 1 * (10 ^ len)).toString();
