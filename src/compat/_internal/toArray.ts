export function toArray<T>(value: ArrayLike<T>): T[] {
  return Array.isArray(value) ? value : [...value];
}
