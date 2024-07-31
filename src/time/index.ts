/**
 * Returns, e.g:
 * 125 ms
 * 1.125 sec
 * 11 sec
 * 1m12s
 * 59m2s
 * 1h3m12s
 * @param ms
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
 * @param from
 * @param until
 */
export const since = (from: number, until = Date.now()): string =>
  parseMs(until - from);

/**
 * using _ = blockTimer()
 * // will log "took 1.234 sec" on dispose
 *
 * using _ = blockTimer('named')
 * // will log "named took 1.234 sec" on dispose
 * @param name
 */
export const blockTimer = (name?: string): Disposable => {
  const started = Date.now();

  return {
    [Symbol.dispose](): void {
      console.debug(`${name ? `${name} ` : ''}took ${since(started)}`);
    },
  };
};
