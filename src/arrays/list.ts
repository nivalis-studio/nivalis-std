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

  append(item: T) {
    this.push(item);

    return this;
  }

  compact() {
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

  shuffle() {
    return List.fromArray(shuffle(this));
  }

  remove(value: T) {
    return List.fromArray(remove(this, value));
  }

  last() {
    return last(this);
  }

  lastIndex() {
    return lastIndex(this);
  }

  pick() {
    return pick(this);
  }

  sample(size: number) {
    return sample(this, size);
  }

  uniq() {
    return uniq(this);
  }

  union(other: List<T>) {
    return union(this, other);
  }

  intersection(...others: Array<List<T>>) {
    return intersection(this, ...others);
  }

  xor(other: List<T>) {
    return xor(this, other);
  }

  difference(...others: Array<List<T>>) {
    return difference(this, ...others);
  }

  select<K>(
    mapper: (item: T, index: number) => K,
    condition: (item: T, index: number) => boolean,
  ) {
    return select(this, mapper, condition);
  }

  group<Key extends string | number | symbol>(
    getGroupId: (item: T) => Key,
  ): Partial<{ [key in Key]: T[] }> {
    return group(this, getGroupId);
  }

  randomIndex() {
    return randomIndex(this);
  }

  countOccurrences(value: T) {
    return countOccurrences(this, value);
  }

  chunk(size: number) {
    return chunk(this, size);
  }

  average(this: List<number>) {
    return average(this);
  }

  sortNumbers(this: List<number>, dir: 'asc' | 'desc') {
    return sortNumbers(this, dir);
  }
}
