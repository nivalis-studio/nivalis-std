/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 * @template T
 * @template Key
 * @param {T[]} array - The array to group.
 * @param {(item: T) => Key} getGroupId - A function that returns the group id for each item.
 * @returns {Partial<{ [key in Key]: T[] }>} A map where the keys are the group ids and the value is an array of each item in that group.
 */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key,
): Partial<{ [key in Key]: T[] }> => {
  return array.reduce<{ [key in Key]: T[] }>(
    (acc, item) => {
      const groupId = getGroupId(item);

      // eslint-disable-next-line no-param-reassign
      if (!acc[groupId]) acc[groupId] = [];
      acc[groupId].push(item);

      return acc;
    },
    {} as { [key in Key]: T[] },
  );
};
