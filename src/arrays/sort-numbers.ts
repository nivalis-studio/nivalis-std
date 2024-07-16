export const sortNumbers = (array: number[], dir = 'asc' as 'asc' | 'desc') =>
	[...array].sort((a, b) => (a - b) * (dir === 'desc' ? -1 : 1));
