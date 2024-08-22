import { describe, expect, test } from 'bun:test';
import { capitalize, capitalizeWords } from './capitalize';

describe('capitalize', () => {
  test('should capitalize the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should capitalize the first letter of an uppercase word and convert the rest to lowercase', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  test('should return an empty string if the input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  test('should handle strings with only one character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  test('should handle strings with special characters', () => {
    expect(capitalize('!hello')).toBe('!hello');
  });
});

describe('capitalizeWords', () => {
  test('should capitalize the first letter of each word in a sentence', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('should handle multiple spaces between words', () => {
    expect(capitalizeWords('hello   world')).toBe('Hello   World');
  });

  test('should handle strings that are already capitalized', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });

  test('should capitalize words and convert the rest of the characters to lowercase', () => {
    expect(capitalizeWords('hELLo WoRLD')).toBe('Hello World');
  });

  test('should handle a single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  test('should return an empty string if the input is empty', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('should handle special characters correctly', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-world');
    expect(capitalizeWords('hello_world')).toBe('Hello_world');
  });
});
