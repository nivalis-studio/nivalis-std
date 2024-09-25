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

  /**
   * Get a random value with `Math.random()`
   * @template T
   * @returns {T} A random element from the array.
   */
  pick(): T {
    return pick(this);
  }

  /**
   * Returns a sample element array of a specified `size`.
   *
   * This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
   *
   * {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algoritm}
   * @template T
   * @param {number} size - The number of elements to sample.
   * @returns {T[]} An array containing the sampled elements.
   */
  sample(size: number): List<T> {
    return List.fromArray(sample(this, size));
  }

  /**
   * Creates a duplicate-free version of an array.
   *
   * This function takes an array and returns a new array containing only the unique values from the original array, preserving the order of first occurrence.
   * @template T - The type of elements in the array.
   * @returns {T[]} A new array with only unique values from the original array.
   */
  uniq(): List<T> {
    return List.fromArray(uniq(this));
  }

  /**
   * Creates an array of unique values from all given arrays.
   *
   * This function takes two arrays, merges them into a single array, and returns a new array
   * containing only the unique values from the merged array.
   * @template T - The type of elements in the array.
   * @param {List<T>} other - The second array to merge and filter for unique values.
   * @returns {List<T>} A new array of unique values.
   */
  union(other: List<T>): List<T> {
    return List.fromArray(union(this, other));
  }

  /**
   * Returns the intersection of two arrays.
   *
   * This function takes two arrays and returns a new array containing the elements that are
   * present in both arrays. It effectively filters out any elements from the first array that
   * are not found in the second array.
   * @template T
   * @param {T[]} others - The arrays to intersect. Each array is compared to the other arrays
   * @returns {T[]} A new array containing the elements that are present in both arrays.
   */
  intersection(...others: Array<List<T>>): List<T> {
    return List.fromArray(intersection(this, ...others));
  }

  xor(other: T[]): List<T> {
    return List.fromArray(xor(this, other));
  }

  /**
   * Computes the difference the current list and another array.
   *
   * This function takes two arrays and returns a new array containing the elements
   * that are present in the current list but not in the second array. It effectively filters out any elements from the current list that also appear in the second array.
   * @template T
   * @param {T[]} diffs - The array containing elements to be excluded from the current list.
   * Each element in this array will be checked against the current list, and if a match is found, that element will be excluded from the result.
   * @returns {T[]} A new array containing the elements that are present in the current list but not in the second array.
   * @example
   * const list = new List(...[1, 2, 3, 4, 5]);
   * const array2 = [2, 4];
   * const result = list.difference(array2);
   * // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
   */
  difference(...diffs: T[][]): List<T> {
    return List.fromArray(difference(this, ...diffs));
  }

  select<K>(
    mapper: (item: T, index: number) => K,
    condition: (item: T, index: number) => boolean,
  ): List<K> {
    return List.fromArray(select(this, mapper, condition));
  }

  /**
   * Sorts a list of items into groups. The return value is a map where the keys are the group ids the given getGroupId function produced and the value is a list of each item in that group.
   * @template T
   * @template Key
   * @param {(item: T) => Key} getGroupId - A function that returns the group id for each item.
   * @returns {Partial<{ [key in Key]: T[] }>} A map where the keys are the group ids and the value is an array of each item in that group.
   */
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

  /**
   * Creates an array of elements split into groups the length of size.
   * If collection can’t be split evenly, the
   * final chunk will be the remaining elements.
   * @template T The type of elements in the array.
   * @param {number} size - The size of each smaller array. Must be a positive integer.
   * @returns {List<T[]>} A two-dimensional array where each sub-array has a maximum length of `size`.
   */
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
