/**
 * Just like a Promise but you can manually resolve or reject it
 */
export class Future<T> {
	#resolve!: (value: T) => void;
	#reject!: (value: unknown) => void;
	promise: Promise<T>;

	constructor() {
		this.promise = new Promise((subresolve, subreject) => {
			this.#resolve = subresolve;
			this.#reject = subreject;
		});
	}
	get resolve(): (value: T) => void {
		return this.#resolve;
	}
	get reject(): (error: unknown) => void {
		return this.#reject;
	}
}
