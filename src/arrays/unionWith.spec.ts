import { describe, expect, it } from 'bun:test';
import { unionWith } from './unionWith';

describe('unionWith', () => {
  it('should work with a `comparator`', () => {
    expect(
      unionWith(
        [
          { x: 1, y: 2 },
          { x: 2, y: 1 },
        ],
        [
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ],
        (a, b) => a.x === b.x,
      ),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });
});
