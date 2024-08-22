import type { CurrencyCode } from './types';

export type Currency = {
  amount: string;
  currencyCode: CurrencyCode;
};

export const formatPrice = (
  { amount, currencyCode }: Currency,
  locale = 'fr',
  quantity = 1,
  disableCents = false,
): string => {
  const price = Number.parseFloat(amount);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    maximumFractionDigits: disableCents && price % 1 === 0 ? 0 : 2,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    minimumFractionDigits: disableCents && price % 1 === 0 ? 0 : 2,
  }).format(price * quantity);
};

export { type CurrencyCode } from './types';
