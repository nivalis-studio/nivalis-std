import { describe, expect, it } from 'bun:test';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('randomizes the order of an array', () => {
    const arr = [1, 2, 3, 4, 5];

    expect([...shuffle(arr)].sort((a, b) => a - b)).toEqual(
      [...arr].sort((a, b) => a - b),
    );
  });

  it('does not modify the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copiedArr = [...arr];

    shuffle(arr);
    expect(arr).toEqual(copiedArr);
  });
});
