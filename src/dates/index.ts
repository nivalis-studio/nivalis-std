export const getDaysSince = (date: Date) =>
	Math.floor((Date.now() - date.getTime()) / 1000 / 60 / 60 / 24);
