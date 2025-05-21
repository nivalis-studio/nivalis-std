import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('randomizes the order of an array', () => {
    const arr = [1, 2, 3, 4, 5];

    expect([...shuffle(arr)].sort()).toEqual([...arr].sort());
  });

  it('does not modify the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copiedArr = [...arr];

    shuffle(arr);
    expect(arr).toEqual(copiedArr);
  });
});
