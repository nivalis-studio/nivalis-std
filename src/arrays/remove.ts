/**
 * Remove an item of an array.
 * @param array
 * @param element
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
