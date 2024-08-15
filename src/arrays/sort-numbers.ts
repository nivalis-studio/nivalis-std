export const sortNumbers = (
  array: number[],
  dir = 'asc' as 'asc' | 'desc',
): number[] => [...array].sort((x, y) => (x - y) * (dir === 'desc' ? -1 : 1));
