export const sortNumbers = (
  array: number[],
  dir = 'asc' as 'asc' | 'desc',
): number[] => [...array].sort((a, b) => (a - b) * (dir === 'desc' ? -1 : 1));
