type SleepOptions = {
  signal?: AbortSignal;
};

// eslint-disable-next-line jsdoc/require-param
/**
 * Sleep for a given amount of time
 * @param {number} ms Amount
 */
export const sleep = async (
  ms: number,
  { signal }: SleepOptions | undefined = {},
): Promise<void> => {
  await new Promise<void>((resolve, reject): void => {
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
};
