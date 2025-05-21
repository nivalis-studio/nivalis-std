import { describe, expect, spyOn, test } from 'bun:test';
import { blockTimer, parseMs, since } from './index';

describe('parseMs', () => {
  test('should correctly parse milliseconds under 1 second', () => {
    expect(parseMs(125)).toBe('125 ms');
    expect(parseMs(999)).toBe('999 ms');
  });

  test('should correctly parse milliseconds between 1 and 5 seconds', () => {
    expect(parseMs(1100)).toBe('1.100 sec');
    expect(parseMs(4999)).toBe('4.999 sec');
  });

  test('should correctly parse milliseconds under 1 minute', () => {
    expect(parseMs(60_000)).toBe('1m0s');
    expect(parseMs(119_999)).toBe('1m59s');
  });

  test('should correctly parse milliseconds under 1 hour', () => {
    expect(parseMs(3_600_000)).toBe('1h0m');
    expect(parseMs(3_599_000)).toBe('59m59s');
  });

  test('should correctly parse milliseconds for more than 1 hour', () => {
    expect(parseMs(86_400_000)).toBe('24h');
    expect(parseMs(5_400_000)).toBe('1h30m');
  });

  test('should correctly parse milliseconds for more than 1 day', () => {
    expect(parseMs(172_800_000)).toBe('2 days');
    expect(parseMs(129_600_000)).toBe('36h');
  });
});

describe('since', () => {
  test('should return the time passed since a given timestamp', () => {
    const from = Date.now() - 3_600_000; // 1 hour ago

    expect(since(from)).toBe('1h0m');
  });

  test('should return the time passed between two timestamps', () => {
    const from = Date.now() - 60_000; // 1 minute ago
    const until = Date.now();

    expect(since(from, until)).toBe('1m0s');
  });
});

describe('blockTimer', () => {
  test('should log the time taken for a block', () => {
    const consoleSpy = spyOn(console, 'debug').mockImplementation(() => {});

    const timer = blockTimer();

    setTimeout(() => {
      timer[Symbol.dispose]();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/took \d+\.\d{3} sec/),
      );
    }, 1100);

    consoleSpy.mockRestore();
  });

  test('should log the time taken for a named block', () => {
    const consoleSpy = spyOn(console, 'debug').mockImplementation(() => {});

    const timer = blockTimer('named');

    setTimeout(() => {
      timer[Symbol.dispose]();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/named took \d+\.\d{3} sec/),
      );
    }, 1100);

    consoleSpy.mockRestore();
  });
});
