import { describe, expect, it } from 'vitest';
import { noop } from '../../function/noop';
import { property } from './property';

describe('property', () => {
  it('should create a function that plucks a property value of a given object', () => {
    const object = { a: 1 };

    for (const path of ['a', ['a']]) {
      const prop = property(path);

      expect(prop.length).toBe(1);
      expect(prop(object)).toBe(1);
    }
  });

  it('should pluck deep property values', () => {
    const object = { a: { b: 2 } };

    for (const path of ['a.b', ['a', 'b']]) {
      const prop = property(path);

      expect(prop(object)).toBe(2);
    }
  });

  it('should pluck inherited property values', () => {
    function Foo() {}

    Foo.prototype.a = 1;

    for (const path of ['a', ['a']]) {
      const prop = property(path);

      expect(
        prop(
          // eslint-disable-next-line
          // @ts-ignore
          new Foo(),
        ),
      ).toBe(1);
    }
  });

  it('should work with a non-string `path`', () => {
    const array = [1, 2, 3];

    for (const path of [1, [1]]) {
      const prop = property(path);

      expect(prop(array)).toBe(2);
    }
  });

  it('should preserve the sign of `0`', () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, new Object(-0), 0, new Object(0)];

    const actual = props.map(key => {
      const prop = property(key);

      return prop(object);
    });

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it('should pluck a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    for (const path of ['a.b', ['a.b']]) {
      const prop = property(path);

      expect(prop(object)).toBe(1);
    }
  });

  it('should return `undefined` when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = values.map(noop);

    for (const path of ['constructor', ['constructor']]) {
      const prop = property(path);

      const actual = values.map(value => prop(value));

      expect(actual).toEqual(expected);
    }
  });

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = values.map(noop);

    for (const path of [
      'constructor.prototype.valueOf',
      ['constructor', 'prototype', 'valueOf'],
    ]) {
      const prop = property(path);

      const actual = values.map(value => prop(value));

      expect(actual).toEqual(expected);
    }
  });

  it('should return `undefined` if parts of `path` are missing', () => {
    const object = {};

    for (const path of ['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']]) {
      const prop = property(path);

      expect(prop(object)).toBe(undefined);
    }
  });
});
