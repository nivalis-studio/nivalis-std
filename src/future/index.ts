/**
 * Just like a Promise but you can manually resolve or reject it
 */
export class Future<T> implements Promise<T> {
  [Symbol.toStringTag] = 'Promise';
  promise: Promise<T>;
  #resolve!: (value: T | PromiseLike<T>) => void;
  #reject!: (value: unknown) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  get resolve(): (value: T) => void {
    return this.#resolve;
  }

  get reject(): (error: unknown) => void {
    return this.#reject;
  }

  // biome-ignore lint/suspicious/noThenProperty: Intentional
  async then<Result1 = T, Result2 = never>(
    onfulfilled?: ((value: T) => Result1 | PromiseLike<Result1>) | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onrejected?: ((reason: any) => Result2 | PromiseLike<Result2>) | null,
  ): Promise<Result1 | Result2> {
    return await this.promise.then(onfulfilled, onrejected);
  }

  async catch<Result = never>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onrejected?: ((reason: any) => Result | PromiseLike<Result>) | null,
  ): Promise<T | Result> {
    return await this.promise.catch(onrejected);
  }

  async finally(onfinally?: (() => void) | null): Promise<T> {
    return await this.promise.finally(onfinally);
  }
}
