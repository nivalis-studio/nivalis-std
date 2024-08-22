import { describe, expect, test } from 'bun:test';
import { generateRandomNumber } from './random-number';

describe('generateRandomNumber', () => {
  test('should generate a string of default length 6', () => {
    const randomNumber = generateRandomNumber(6);

    expect(randomNumber).toHaveLength(6);
  });

  test('should generate a string of specified length', () => {
    const randomNumber = generateRandomNumber(8);

    expect(randomNumber).toHaveLength(8);
  });

  test('should generate a numeric string', () => {
    const randomNumber = generateRandomNumber();

    expect(Number(randomNumber)).not.toBeNaN();
  });
});
