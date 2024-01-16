import {DAY_IN_MS} from '../constants';

export const getDaysSince = (date: Date) =>
	Math.floor((Date.now() - date.getTime()) / DAY_IN_MS);

export const isToday = (date: Date) =>
	new Date().toDateString() === date.toDateString();

export const isInThisMonth = (date: Date, month: number, year: number) =>
	date.getMonth() === month && date.getFullYear() === year;

export const getDateFromDeltaDays = (date: Date, numberDays: number) =>
	new Date(date.valueOf() + DAY_IN_MS * numberDays);

export const convertToParisTime = (dateAsUtc: Date) =>
	new Date(dateAsUtc.getTime() + dateAsUtc.getTimezoneOffset() * 60 * 1000);
