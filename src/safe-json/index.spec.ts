import { describe, expect, spyOn, test } from 'bun:test';
import { SafeJson } from './index';

describe('SafeJson', () => {
  describe('isStringifyable', () => {
    test('should return true for a simple object', () => {
      expect(SafeJson.isStringifyable({ key: 'value' })).toBe(true);
    });

    test('should return false for a circular reference', () => {
      const obj: { [key: string]: unknown } = {};

      obj.circular = obj;
      expect(SafeJson.isStringifyable(obj)).toBe(false);
    });

    test('should return true for a simple array', () => {
      expect(SafeJson.isStringifyable([1, 2, 3])).toBe(true);
    });

    test('should return true for a number', () => {
      expect(SafeJson.isStringifyable(123)).toBe(true);
    });

    test('should return true for a function', () => {
      expect(SafeJson.isStringifyable(() => {})).toBe(true);
    });
  });

  describe('isParsable', () => {
    test('should return true for a valid JSON string', () => {
      expect(SafeJson.isParsable('{"key": "value"}')).toBe(true);
    });

    test('should return false for an invalid JSON string', () => {
      expect(SafeJson.isParsable('{key: "value"}')).toBe(false);
    });

    test('should return false for a non-string value', () => {
      expect(SafeJson.isParsable(123)).toBe(false);
    });

    test('should return false for an empty string', () => {
      expect(SafeJson.isParsable('')).toBe(false);
    });

    test('should return true for a valid JSON string containing special characters', () => {
      expect(
        SafeJson.isParsable('{"key": "value with special characters #@$"}'),
      ).toBe(true);
    });
  });

  describe('parseOr', () => {
    test('should parse a valid JSON string', () => {
      expect(SafeJson.parseOr('{"key": "value"}', {})).toEqual({
        key: 'value',
      });
    });

    test('should return the fallback value for an invalid JSON string', () => {
      const consoleError = spyOn(console, 'error').mockImplementation(() => {});

      expect(SafeJson.parseOr('{key: "value"}', { fallback: true })).toEqual({
        fallback: true,
      });

      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
    });

    test('should return a boolean true for "true"', () => {
      expect(SafeJson.parseOr('true', false)).toBe(true);
    });

    test('should return a boolean false for "false"', () => {
      expect(SafeJson.parseOr('false', true)).toBe(false);
    });

    test('should return null for "null"', () => {
      expect(SafeJson.parseOr('null', {})).toBeNull();
    });

    test('should return NaN for "NaN"', () => {
      expect(SafeJson.parseOr('NaN', 0)).toBeNaN();
    });

    test('should return Infinity for "infinity"', () => {
      expect(SafeJson.parseOr('infinity', 0)).toBe(Number.POSITIVE_INFINITY);
    });

    test('should return -Infinity for "-infinity"', () => {
      expect(SafeJson.parseOr('-infinity', 0)).toBe(Number.NEGATIVE_INFINITY);
    });

    test('should handle strings with escaped characters correctly', () => {
      expect(SafeJson.parseOr(String.raw`"escaped \"quote\""`, '')).toBe(
        'escaped "quote"',
      );
    });

    test('should prevent prototype pollution attacks', () => {
      const consoleWarn = spyOn(console, 'warn').mockImplementation(() => {});
      const consoleError = spyOn(console, 'error').mockImplementation(() => {});

      const value = '{"__proto__": {"polluted": "yes"}}';
      const result = SafeJson.parseOr(value, {});

      expect(result).not.toHaveProperty('__proto__.polluted');
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          '[safeJson] Dropping "__proto__" key to prevent prototype pollution.',
        ),
      );
      expect(consoleError).not.toHaveBeenCalled();

      consoleWarn.mockRestore();
      consoleError.mockRestore();
    });

    test('should handle errors gracefully and return fallback value', () => {
      const consoleError = spyOn(console, 'error').mockImplementation(() => {});

      const value = '{"invalidJson": }';
      const result = SafeJson.parseOr(value, { fallback: true });

      expect(result).toEqual({ fallback: true });
      expect(consoleError).toHaveBeenCalledWith(expect.any(SyntaxError));

      consoleError.mockRestore();
    });
  });
});
