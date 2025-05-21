import { describe, expect, it } from 'vitest';
import { map } from '../array/map';
import { stubString } from '../util/stubString';
import { upperFirst } from './upperFirst';

describe('upperFirst', () => {
  it('should uppercase only the first character', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) =>
      index ? upperFirst(value as any) : upperFirst(),
    );

    expect(actual).toEqual(expected);
  });
});
