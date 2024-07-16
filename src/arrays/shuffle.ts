/**
 * Randomly shuffle an array.
 * Fisher–Yates algorithm.
 * Based on: https://stackoverflow.com/a/12646864/4919972
 *
 * @return Returns the new shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] => {
	const arrayCopy = [...array];

	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}

	return arrayCopy;
};
