const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
});

export default function toDollars(value) {
  return CURRENCY_FORMATTER.format(value / 100);
}
