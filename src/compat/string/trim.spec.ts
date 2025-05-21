import { describe, expect, it } from 'vitest';
import { whitespace } from '../_internal/whitespace';
import { trim } from './trim';

describe('trim', () => {
  const func = trim;

  it(`\`trim\` should remove trailing whitespace`, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c`;

    expect(func(string)).toBe(expected);
  });

  it(`\`trim\` should coerce \`string\` to a string`, () => {
    const object = {
      toString: () => `${whitespace}a b c${whitespace}`,
    };
    const expected = `a b c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(object)).toBe(expected);
  });

  it(`\`trim\` should remove leading and trailing \`chars\``, () => {
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c`;

    expect(func(string, '_-')).toBe(expected);
    expect(func(string, ['_', '-'])).toBe(expected);
  });

  it(`\`trim\` should coerce \`chars\` to a string`, () => {
    const object = { toString: () => '_-' };
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(string, object)).toBe(expected);
  });

  it(`\`trim\` should return an empty string for empty values and \`chars\``, () => {
    for (const chars of [null, '_-']) {
      // eslint-disable-next-line
      // @ts-ignore
      expect(func(null, chars)).toBe('');
      // eslint-disable-next-line
      // @ts-ignore
      expect(func(undefined, chars)).toBe('');
      // eslint-disable-next-line
      // @ts-ignore
      expect(func('', chars)).toBe('');
    }
  });

  it(`\`trim\` should work with \`undefined\` or empty string values for \`chars\``, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c`;

    expect(func(string)).toBe(expected);
    expect(func(string, '')).toBe(string);
  });

  it(`\`trim\` should work as an iteratee for methods like \`_.map\``, () => {
    const string = new Object(`${whitespace}a b c${whitespace}`);
    const trimmed = `a b c`;
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [string, string, string].map(func);

    expect(actual).toEqual([trimmed, trimmed, trimmed]);
  });

  it(`\`trim\` should support character arrays`, () => {
    const string = 'hello world';
    const expected = 'o wo';

    expect(func(string, ['rld', 'hel'])).toBe(expected);
    expect(func(string, ['rl', 'd', 'he', 'l'])).toBe(expected);
    expect(func(string, ['he', 'd', 'lr'])).toBe(expected);
    expect(func(string, ['d', 'l', 'r', 'e', 'h'])).toBe(expected);
  });
});
