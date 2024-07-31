import { MS_IN_DAY } from '../constants';

export const getDaysSince = (date: Date): number =>
  Math.floor((Date.now() - date.getTime()) / MS_IN_DAY);

export const isToday = (date: Date): boolean =>
  new Date().toDateString() === date.toDateString();

export const isInThisMonth = (
  date: Date,
  month: number,
  year: number,
): boolean => date.getMonth() === month && date.getFullYear() === year;

export const getDateFromDeltaDays = (date: Date, numberDays: number): Date =>
  new Date(date.valueOf() + MS_IN_DAY * numberDays);

export const convertToParisTime = (dateAsUtc: Date): Date =>
  new Date(dateAsUtc.getTime() + dateAsUtc.getTimezoneOffset() * 60 * 1000);
