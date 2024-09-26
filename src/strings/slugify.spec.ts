import { describe, expect, test } from 'bun:test';
import { slugify } from './slugify';

describe('slugify', () => {
  test('should return the original string if it is already slug compliant', () => {
    expect(slugify('hello')).toBe('hello');
  });

  test('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  test('should remove consecutive hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  test('should remove left and right hyphens', () => {
    expect(slugify('          hello world  ')).toBe('hello-world');
  });

  test('should remove accentued and special characters', () => {
    expect(slugify("Bonsoir l'Amérique")).toBe('bonsoir-lamerique');
  });
});
