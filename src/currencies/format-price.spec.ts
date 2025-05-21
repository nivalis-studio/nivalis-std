import { describe, expect, test } from 'bun:test';
import { formatPrice } from './index';
import type { Currency } from './index';

describe('formatPrice', () => {
  test('should format price with default locale and cents enabled', () => {
    const money = { amount: '1234.56', currencyCode: 'EUR' } satisfies Currency;
    const result = formatPrice(money);

    expect(result).toBe('1 234,56 €');
  });

  test('should format price with custom locale and cents enabled', () => {
    const money = { amount: '1234.56', currencyCode: 'USD' } satisfies Currency;
    const result = formatPrice(money, 'en-US');

    expect(result).toBe('$1,234.56');
  });

  test('should format price with quantity multiplier', () => {
    const money = { amount: '1234.56', currencyCode: 'USD' } satisfies Currency;
    const result = formatPrice(money, 'en-US', 2);

    expect(result).toBe('$2,469.12');
  });

  test('should format price with cents disabled when applicable', () => {
    const money = { amount: '1234.00', currencyCode: 'USD' } satisfies Currency;
    const result = formatPrice(money, 'en-US', 1, true);

    expect(result).toBe('$1,234');
  });

  test('should still include cents if the amount has fractional part even if disableCents is true', () => {
    const money = { amount: '1234.56', currencyCode: 'USD' } satisfies Currency;
    const result = formatPrice(money, 'en-US', 1, true);

    expect(result).toBe('$1,234.56');
  });

  test('should format price correctly with a different currency code', () => {
    const money = { amount: '1234.56', currencyCode: 'GBP' } satisfies Currency;
    const result = formatPrice(money, 'en-GB');

    expect(result).toBe('£1,234.56');
  });

  test('should handle large quantities correctly', () => {
    const money = { amount: '1000.00', currencyCode: 'EUR' } satisfies Currency;
    const result = formatPrice(money, 'fr', 100);

    expect(result).toBe('100 000,00 €');
  });
});
