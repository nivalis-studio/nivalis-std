type SleepOptions = {
	signal?: AbortSignal;
};

/**
 * Sleep for a given amount of time
 */
export const sleep = async (
	ms: number,
	{ signal }: SleepOptions | undefined = {},
): Promise<void> =>
	new Promise((resolve, reject): void => {
		if (signal?.aborted) {
			reject(new Error('Aborted'));
			return;
		}

		const timeout = setTimeout(() => {
			resolve();
		}, ms);

		const onAbort = () => {
			clearTimeout(timeout);
			reject(new Error('Aborted'));
		};

		if (signal) {
			signal.addEventListener('abort', onAbort, { once: true });
		}
	});
