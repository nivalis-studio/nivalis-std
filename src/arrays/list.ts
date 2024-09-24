import { average } from './average';
import { chunk } from './chunk';
import { countOccurrences } from './count-occurences';
import { difference } from './difference';
import { group } from './group';
import { intersection } from './intersection';
import { last, lastIndex } from './last';
import { pick, sample } from './pick';
import { randomIndex } from './random-index';
import { remove } from './remove';
import { select } from './select';
import { shuffle } from './shuffle';
import { sortNumbers } from './sort-numbers';
import { union } from './union';
import { uniq } from './uniq';
import { xor } from './xor';

// TODO: document methods
export class List<T> extends Array<T> {
  static fromArray<S>(arr: S[]) {
    return new List(...arr);
  }

  static fromIterable<S>(iterable: Iterable<S>): List<S> {
    return new List(...iterable);
  }

  static toArray<S>(list: List<S>): S[] {
    return list;
  }

  toArray(): T[] {
    return this;
  }

  append(item: T): this {
    this.push(item);

    return this;
  }

  compact(): List<NonNullable<T>> {
    return List.fromArray(
      this.filter(
        (item): item is NonNullable<T> => item != null && item !== undefined,
      ),
    );
  }

  keep<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
  ): List<S>;

  keep(predicate: (value: T, index: number, array: T[]) => unknown): List<T>;

  keep(predicate: (value: T, index: number, array: T[]) => unknown): List<T> {
    return List.fromArray(this.filter(predicate));
  }

  reject<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
  ): List<Exclude<T, S>>;

  reject(predicate: (value: T, index: number, array: T[]) => unknown): List<T>;

  reject(predicate: (value: T, index: number, array: T[]) => unknown): List<T> {
    return List.fromArray(this.filter((...args) => !predicate(...args)));
  }

  /**
   * Randomizes the order of elements in an list using the Fisher-Yates algorithm.
   * @template T - The type of elements in the list.
   * @returns {T[]} A new list with its elements shuffled in random order.
   * @example
   * const list = new List(...[1, 2, 3, 4, 5]);
   * const shuffledList = list.shuffle();
   * // shuffledList will be a new list with elements of list in random order, e.g., [3, 1, 4, 5, 2]
   */
  shuffle(): List<T> {
    return List.fromArray(shuffle(this));
  }

  /**
   * Remove an item of a list.
   * @template T
   * @param {T} element - The element to remove from the list.
   * @returns {T[]} A new list with the element removed.
   */
  remove(element: T): List<T> {
    return List.fromArray(remove(this, element));
  }

  last(): T | undefined {
    return last(this);
  }

  lastIndex(): number {
    return lastIndex(this);
  }

  pick(): T {
    return pick(this);
  }

  sample(size: number): List<T> {
    return List.fromArray(sample(this, size));
  }

  uniq(): List<T> {
    return List.fromArray(uniq(this));
  }

  union(other: List<T>): List<T> {
    return List.fromArray(union(this, other));
  }

  intersection(...others: Array<List<T>>): List<T> {
    return List.fromArray(intersection(this, ...others));
  }

  xor(other: T[]): List<T> {
    return List.fromArray(xor(this, other));
  }

  difference(...others: T[][]): List<T> {
    return List.fromArray(difference(this, ...others));
  }

  select<K>(
    mapper: (item: T, index: number) => K,
    condition: (item: T, index: number) => boolean,
  ): List<K> {
    return List.fromArray(select(this, mapper, condition));
  }

  group<Key extends string | number | symbol>(
    getGroupId: (item: T) => Key,
  ): Partial<{ [key in Key]: T[] }> {
    return group(this, getGroupId);
  }

  /**
   * Get a random index with `Math.random()`
   * @returns {number} A random index in the list.
   */
  randomIndex(): number {
    return randomIndex(this);
  }

  /**
   * Counts the occurrences of a value in an list.
   * @template T - The type of values in the list.
   * @param {T} value - The value to count occurrences of.
   * @returns {number} The number of occurrences of the value in the list.
   * @example
   * const list = new List(...[1, 2, 3, 1]);
   * const value = 1;
   * const result = list.countOccurrences(value);
   * // result will be 2
   */
  countOccurrences(value: T): number {
    return countOccurrences(this, value);
  }

  chunk(size: number): List<T[]> {
    return List.fromArray(chunk(this, size));
  }

  /**
   * Returns the average of the current list.
   * If the list is empty, this function returns `NaN`.
   * @returns {number} The average of all the numbers in the array.
   * @example
   * const list = new List(...[1, 2, 3, 4, 5]);
   * const result = list.average();
   * // result will be 3
   */
  average(this: List<number>): number {
    return average(this);
  }

  /**
   * Sorts the current list in ascending or descending order.
   * @param {"asc"|"desc"} dir - The direction to sort the array. Can be 'asc' or 'desc'.
   * @returns {List<number>} The sorted list of numbers.
   */
  sortNumbers(this: List<number>, dir: 'asc' | 'desc'): List<number> {
    return List.fromArray(sortNumbers(this, dir));
  }
}
