import { describe, expect, test } from 'bun:test';
import { generateRandomChar } from './char';

describe('generateRandomChar', () => {
  test('should generate a string of default length 6', () => {
    const randomChar = generateRandomChar();

    expect(randomChar).toHaveLength(6);
  });

  test('should generate a string of specified length', () => {
    const randomChar = generateRandomChar(8);

    expect(randomChar).toHaveLength(8);
  });

  test('should generate characters from the correct set', () => {
    const randomChar = generateRandomChar();
    const allowedChars = '123456789ACEFHJKLMNPRTUVWXY';

    for (const char of randomChar) {
      expect(allowedChars).toContain(char);
    }
  });
});
