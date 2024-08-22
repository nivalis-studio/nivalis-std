import { describe, expect, test } from 'bun:test';
import { truncate, truncateMiddle } from './truncate';

describe('truncate', () => {
  test('should return the original string if it is shorter than the max length', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  test('should truncate the string and add the default ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('he...');
  });

  test('should truncate the string and add a custom ellipsis', () => {
    expect(truncate('hello world', 5, '---')).toBe('he---');
  });

  test('should return only the ellipsis if max length is equal to or less than the ellipsis length', () => {
    expect(truncate('hello world', 2)).toBe('...');
    expect(truncate('hello world', 3, '---')).toBe('---');
  });

  test('should handle edge cases with very small strings', () => {
    expect(truncate('a', 1)).toBe('a');
    expect(truncate('a', 0)).toBe('...');
  });

  test('should handle the case where max length is undefined or 0', () => {
    expect(truncate('hello world')).toBe('hello world');
    expect(truncate('hello world', 0)).toBe('...');
  });
});

describe('truncateMiddle', () => {
  test('should return the original string if it is shorter than the max length', () => {
    expect(truncateMiddle('hello', 10)).toBe('hello');
  });

  test('should truncate the middle of the string and add the default ellipsis', () => {
    expect(truncateMiddle('hello world', 5)).toBe('h...d');
  });

  test('should truncate the middle of the string and add a custom ellipsis', () => {
    expect(truncateMiddle('hello world', 5, '---')).toBe('h---d');
  });

  test('should return only the ellipsis if max length is equal to or less than the ellipsis length', () => {
    expect(truncateMiddle('hello world', 2)).toBe('...');
    expect(truncateMiddle('hello world', 3, '---')).toBe('---');
  });

  test('should handle edge cases with very small strings', () => {
    expect(truncateMiddle('a', 1)).toBe('a');
    expect(truncateMiddle('a', 0)).toBe('...');
  });

  test('should handle the case where max length is undefined or 0', () => {
    expect(truncateMiddle('hello world')).toBe('hello world');
    expect(truncateMiddle('hello world', 0)).toBe('...');
  });
});
