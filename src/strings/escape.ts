export const htmlEscape = (str: string): string => {
	return str
		.replaceAll('&', '&amp;') // Must happen first or else it will escape other just-escaped characters.
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
};

export const htmlUnescape = (html: string): string => {
	return html
		.replaceAll('&gt;', '>')
		.replaceAll('&lt;', '<')
		.replaceAll(/&#0?39;/g, "'")
		.replaceAll('&quot;', '"')
		.replaceAll('&amp;', '&'); // Must happen last or else it will unescape other characters in the wrong order.
};
