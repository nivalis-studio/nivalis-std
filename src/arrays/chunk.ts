/**
 * Creates an array of elements split into groups the length of size. If collection can’t be split evenly, the
 * final chunk will be the remaining elements.
 *
 * @param array The array to process.
 * @param size The length of each chunk.
 * @return Returns the new array containing chunks.
 *
 * Based on: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
 */
export const chunk = <T>(array: readonly T[], size = 1): T[][] => {
	const chunkedArray: T[][] = [];
	let currentChunk: T[] = [];

	for (const item of array) {
		currentChunk.push(item);

		if (currentChunk.length === size) {
			chunkedArray.push(currentChunk);
			currentChunk = [];
		}
	}

	if (currentChunk.length > 0) {
		chunkedArray.push(currentChunk);
	}

	return chunkedArray;
};
