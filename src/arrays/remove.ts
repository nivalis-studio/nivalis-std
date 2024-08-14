/**
 * Remove an item of an array.
 * @template T
 * @param {T[]} array - The array from which to remove an element.
 * @param {T} element - The element to remove from the array.
 * @returns {T[]} A new array with the element removed.
 */
export const remove = <T>(array: T[], element: T): T[] => {
  const array_ = [...array];
  const idx = array_.indexOf(element);

  if (idx < 0) {
    return [];
  }

  array_.splice(idx, 1);

  return array_;
};
