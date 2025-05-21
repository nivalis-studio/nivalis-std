import { describe, expect, test } from 'bun:test';
import { toGb, toHumanBytes, toHumanCount, toKb, toMb } from './index';

describe('Conversion Utilities', () => {
  test('toKb should convert bytes to kilobytes correctly', () => {
    expect(toKb(1024)).toBe(1);
    expect(toKb(2048)).toBe(2);
    expect(toKb(0)).toBe(0);
  });

  test('toMb should convert bytes to megabytes correctly', () => {
    expect(toMb(1024 ** 2)).toBe(1);
    expect(toMb(2048 ** 2)).toBe(4);
    expect(toMb(0)).toBe(0);
  });

  test('toGb should convert bytes to gigabytes correctly', () => {
    expect(toGb(1024 ** 3)).toBe(1);
    expect(toGb(2048 ** 3)).toBe(8);
    expect(toGb(0)).toBe(0);
  });

  test('toHumanBytes should return a human-readable byte string', () => {
    expect(toHumanBytes(500)).toBe('500 byte(s)');
    expect(toHumanBytes(1024)).toBe('1.00 Kb');
    expect(toHumanBytes(1024 ** 2)).toBe('1.00 Mb');
    expect(toHumanBytes(1024 ** 3)).toBe('1.00 Gb');
    expect(toHumanBytes(1024 ** 4)).toBe('1.00 Tb');
  });

  test('toHumanCount should return a human-readable count string', () => {
    expect(toHumanCount(9999)).toBe('9999');
    expect(toHumanCount(10_000)).toBe('10.0 K');
    expect(toHumanCount(1_000_000)).toBe('1.00 M');
    expect(toHumanCount(1_000_000_000)).toBe('1.00 B');
    expect(toHumanCount(1_000_000_000_000)).toBe('1.00 T');
    expect(toHumanCount(10_000_000_000_000)).toBe('10.0 T');
  });
});
