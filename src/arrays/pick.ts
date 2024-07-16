/**
 * Get a random value with `Math.random()`
 * @param array
 * @returns
 */
export const pick = <T>(array: readonly T[]) =>
	array[Math.floor(Math.random() * array.length)];

/**
 * Returns a sample element array of a specified `size`.
 *
 * This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
 *
 * {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algoritm}
 */
export function sample<T>(array: readonly T[], size: number): T[] {
	if (size > array.length) {
		return [...array];
	}

	const result = new Array(size);
	const selected = new Set();

	for (
		let step = array.length - size, resultIndex = 0;
		step < array.length;
		step++, resultIndex++
	) {
		let index = Math.floor(Math.random() * (step + 1));

		if (selected.has(index)) {
			index = step;
		}

		selected.add(index);

		result[resultIndex] = array[index];
	}

	return result;
}
