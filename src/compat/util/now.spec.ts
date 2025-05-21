import { describe, expect, it } from 'vitest';
import { delay } from '../../promise/delay';
import { now } from './now';

describe('now', () => {
  it('should return the number of milliseconds that have elapsed since the Unix epoch', async () => {
    const stamp = Date.now();
    const actual = now();

    expect(actual).toBeGreaterThanOrEqual(stamp);

    await delay(32);

    expect(now() > actual);
  });
});
