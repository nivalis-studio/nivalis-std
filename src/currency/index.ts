import type { CurrencyCode } from './types';

type Money = {
  amount: string;
  currencyCode: CurrencyCode;
};

export const formatPrice = (
  { amount, currencyCode }: Money,
  locale = 'fr',
  quantity = 1,
  disableCents = false,
): string => {
  const price = Number.parseFloat(amount);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: disableCents && price % 1 === 0 ? 0 : 2,
    minimumFractionDigits: disableCents && price % 1 === 0 ? 0 : 2,
  }).format(price * quantity);
};

export { type CurrencyCode } from './types';
