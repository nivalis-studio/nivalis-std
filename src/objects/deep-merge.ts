/**
 * Deep merges two objects recursively by combining their fields
 * If both objects have the same key with object values, they are merged recursively
 * If either value is not an object or is an array, the additional value overwrites the base value
 * @template T - The object type
 * @param {T} base - The base object
 * @param {T} additional - The additional object to merge
 * @returns {T} The merged object
 */
export const deepMerge = <T extends { [key: string]: unknown }>(
  base: T,
  additional: T,
): T => {
  const result = { ...base };

  for (const [key, value] of Object.entries(additional)) {
    if (value === null || value === undefined) {
      continue;
    }

    const baseValue = base[key];

    if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      // biome-ignore lint/nursery/noShadow: Invalid rule
      (result as { [key: string]: unknown })[key] = deepMerge(
        // biome-ignore lint/nursery/noShadow: Invalid rule
        baseValue as { [key: string]: unknown },
        // biome-ignore lint/nursery/noShadow: Invalid rule
        value as { [key: string]: unknown },
      );
    } else {
      // biome-ignore lint/nursery/noShadow: Invalid rule
      (result as { [key: string]: unknown })[key] = value;
    }
  }

  return result;
};
