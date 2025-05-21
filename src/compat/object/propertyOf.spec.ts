import { describe, expect, it } from 'vitest';
import { noop } from '../../function';
import { constant } from '../util/constant';
import { times } from '../util/times';
import { propertyOf } from './propertyOf';

describe('propertyOf', () => {
  it('should create a function that plucks a property value of a given key', () => {
    const object = { a: 1 };
    const propOf = propertyOf(object);

    expect(propOf.length).toBe(1);

    for (const path of ['a', ['a']]) {
      expect(propOf(path)).toBe(1);
    }
  });

  it('should pluck deep property values', () => {
    const object = { a: { b: 2 } };
    const propOf = propertyOf(object);

    for (const path of ['a.b', ['a', 'b']]) {
      expect(propOf(path)).toBe(2);
    }
  });

  it('should pluck inherited property values', () => {
    function Foo() {
      // @ts-expect-error type not defined
      this.a = 1;
    }

    Foo.prototype.b = 2;

    // @ts-expect-error type not defined
    const propOf = propertyOf(new Foo());

    for (const path of ['b', ['b']]) {
      expect(propOf(path)).toBe(2);
    }
  });

  it('should work with a non-string `path`', () => {
    const array = [1, 2, 3];
    const propOf = propertyOf(array);

    for (const path of [1, [1]]) {
      expect(propOf(path)).toBe(2);
    }
  });

  it('should preserve the sign of `0`', () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, new Object(-0), 0, new Object(0)];

    const actual = props.map(key => {
      const propOf = propertyOf(object);

      return propOf(key);
    });

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it('should coerce `path` to a string', () => {
    function fn() {}

    fn.toString = constant('fn');

    const expected = [1, 2, 3, 4];
    const object = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
    const paths = [null, undefined, fn, {}];

    times(2, index => {
      const actual = paths.map(path => {
        const propOf = propertyOf(object);

        // @ts-expect-error invalid types
        return propOf(index ? [path] : path);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should pluck a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };
    const propOf = propertyOf(object);

    for (const path of ['a.b', ['a.b']]) {
      expect(propOf(path)).toBe(1);
    }
  });

  it('should return `undefined` when `object` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(noop);

    for (const path of ['constructor', ['constructor']]) {
      const actual = values.map((value, index) => {
        // @ts-expect-error invalid types
        const propOf = index ? propertyOf(value) : propertyOf();

        return propOf(path);
      });

      expect(actual).toEqual(expected);
    }
  });

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(noop);

    for (const path of [
      'constructor.prototype.valueOf',
      ['constructor', 'prototype', 'valueOf'],
    ]) {
      const actual = values.map((value, index) => {
        // @ts-expect-error invalid types
        const propOf = index ? propertyOf(value) : propertyOf();

        return propOf(path);
      });

      expect(actual).toEqual(expected);
    }
  });

  it('should return `undefined` if parts of `path` are missing', () => {
    const propOf = propertyOf({});

    for (const path of ['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']]) {
      expect(propOf(path)).toBe(undefined);
    }
  });
});
