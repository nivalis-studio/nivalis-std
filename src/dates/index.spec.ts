import { describe, expect, test } from 'bun:test';
import { MS_IN_DAY } from '../constants';
import {
  getDateFromDeltaDays,
  getDaysSince,
  isInThisMonth,
  isToday,
} from './index';

describe('Date Utilities', () => {
  test('getDaysSince should return the correct number of days since a given date', () => {
    const pastDate = new Date(Date.now() - 5 * MS_IN_DAY);

    expect(getDaysSince(pastDate)).toBe(5);
  });

  test('isToday should return true if the date is today', () => {
    const today = new Date();

    expect(isToday(today)).toBe(true);
  });

  test('isToday should return false if the date is not today', () => {
    const pastDate = new Date(Date.now() - MS_IN_DAY);

    expect(isToday(pastDate)).toBe(false);
  });

  test('isInThisMonth should return true if the date is in the specified month and year', () => {
    const now = new Date();

    expect(isInThisMonth(now, now.getMonth(), now.getFullYear())).toBe(true);
  });

  test('isInThisMonth should return false if the date is not in the specified month and year', () => {
    const now = new Date();
    const otherMonth = (now.getMonth() + 1) % 12;

    expect(isInThisMonth(now, otherMonth, now.getFullYear())).toBe(false);
  });

  test('getDateFromDeltaDays should return the correct date when adding days', () => {
    const today = new Date();
    const deltaDays = 10;
    const resultDate = getDateFromDeltaDays(today, deltaDays);

    expect(resultDate.getTime()).toBe(today.getTime() + deltaDays * MS_IN_DAY);
  });

  test('getDateFromDeltaDays should return the correct date when subtracting days', () => {
    const today = new Date();
    const deltaDays = -10;
    const resultDate = getDateFromDeltaDays(today, deltaDays);

    expect(resultDate.getTime()).toBe(today.getTime() + deltaDays * MS_IN_DAY);
  });
});
