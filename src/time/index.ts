/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * @param {number} ms - The number of milliseconds to convert to a string.
 * @returns {string} A string representation of the input number of milliseconds.
 * @example
 * parseMs(125); // "125 ms"
 * parseMs(1100); // "1.1 sec"
 * parseMs(60000); // "1 min"
 * parseMs(3600000); // "1 hour"
 * parseMs(86400000); // "1 day"
 * parseMs(604800000); // "1 week"
 */
export const parseMs = (ms: number): string => {
  // <1 sec
  if (ms < 1000) {
    return `${Math.round(ms)} ms`;
  }

  // < 5 sec
  if (ms < 5000) {
    return `${(ms / 1000).toFixed(3)} sec`;
  }

  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (60 * 1000)) % 60;
  const hrs = Math.floor(ms / (3600 * 1000));

  // <1 hr
  if (hrs === 0) {
    // <1 min
    if (min === 0) {
      return `${sec} sec`;
    }

    return `${min}m${sec}s`;
  }

  if (hrs < 24) {
    return `${hrs}h${min}m`;
  }

  if (hrs < 48) {
    return `${Math.round(hrs + min / 60)}h`;
  }

  // >= 48 hours

  const days = Math.floor(hrs / 24);

  return `${days} days`;
};

/**
 * Returns time passed since `from` until `until` (default to Date.now())
 * @param {number} from - The starting time.
 * @param {number} until - The ending time. Defaults to the current time.
 * @returns {string} A string representation of the time passed since `from` until `until`.
 */
export const since = (from: number, until = Date.now()): string =>
  parseMs(until - from);

/**
 * using _ = blockTimer()
 * // will log "took 1.234 sec" on dispose
 *
 * using _ = blockTimer('named')
 * // will log "named took 1.234 sec" on dispose
 * @param {string} name - The name of the block to log.
 * @returns {Disposable} A disposable object that logs the time taken when disposed.
 */
export const blockTimer = (name?: string): Disposable => {
  const started = Date.now();

  return {
    [Symbol.dispose](): void {
      // eslint-disable-next-line no-console
      console.debug(`${name ? `${name} ` : ''}took ${since(started)}`);
    },
  };
};
