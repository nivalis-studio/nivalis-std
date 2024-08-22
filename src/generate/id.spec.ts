import { describe, expect, test } from 'bun:test';
import { generateId } from './id';

describe('generateId', () => {
  test('should generate a string of default length 21', () => {
    const id = generateId();

    expect(id).toHaveLength(21);
  });

  test('should generate a string of specified length', () => {
    const id = generateId(10);

    expect(id).toHaveLength(10);
  });

  test('should use the default URL_ALPHABET', () => {
    const id = generateId(10);
    const alphabet =
      'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

    for (const char of id) {
      expect(alphabet).toContain(char);
    }
  });

  test('should use a custom alphabet', () => {
    const customAlphabet = 'ABCDEF123';
    const id = generateId(10, customAlphabet);

    for (const char of id) {
      expect(customAlphabet).toContain(char);
    }
  });
});
