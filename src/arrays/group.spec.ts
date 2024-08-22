import { describe, expect, test } from 'bun:test';
import { group } from './group';

describe('group', () => {
  test('should group items by a given key (number keys)', () => {
    const items = [
      { id: 1, category: 'fruit' },
      { id: 2, category: 'vegetable' },
      { id: 3, category: 'fruit' },
      { id: 4, category: 'meat' },
    ];

    const result = group(items, item => item.id % 2);

    expect(result).toEqual({
      0: [
        { id: 2, category: 'vegetable' },
        { id: 4, category: 'meat' },
      ],
      1: [
        { id: 1, category: 'fruit' },
        { id: 3, category: 'fruit' },
      ],
    });
  });

  test('should group items by a given key (string keys)', () => {
    const items = [
      { name: 'apple', type: 'fruit' },
      { name: 'carrot', type: 'vegetable' },
      { name: 'banana', type: 'fruit' },
      { name: 'chicken', type: 'meat' },
    ];

    const result = group(items, item => item.type);

    expect(result).toEqual({
      fruit: [
        { name: 'apple', type: 'fruit' },
        { name: 'banana', type: 'fruit' },
      ],
      vegetable: [{ name: 'carrot', type: 'vegetable' }],
      meat: [{ name: 'chicken', type: 'meat' }],
    });
  });

  test('should handle an empty array', () => {
    const items: Array<{ name: string; type: string }> = [];
    const result = group(items, item => item.type);

    expect(result).toEqual({});
  });

  test('should handle unique grouping key', () => {
    const items = [
      { name: 'apple', id: 1 },
      { name: 'carrot', id: 2 },
      { name: 'banana', id: 3 },
    ];

    const result = group(items, item => item.id);

    expect(result).toEqual({
      1: [{ name: 'apple', id: 1 }],
      2: [{ name: 'carrot', id: 2 }],
      3: [{ name: 'banana', id: 3 }],
    });
  });

  test('should handle grouping by a calculated key', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = group(items, item =>
      item % 3 === 0 ? 'divisible by 3' : 'other',
    );

    expect(result).toEqual({
      'divisible by 3': [3, 6, 9],
      other: [1, 2, 4, 5, 7, 8, 10],
    });
  });
});
