/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 */
/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 */
export function difference<T>(source: T[], ...diffs: readonly T[][]): T[] {
	if (source.length <= 100) {
		return diffs.reduce((a, b) => a.filter((c) => !b.includes(c)), source);
	}

	const secondSet = new Set(...diffs);

	return source.filter((item) => !secondSet.has(item));
}
