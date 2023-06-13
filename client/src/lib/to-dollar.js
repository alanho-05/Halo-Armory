export default function toDollars(value) {
  return `$${(value / 100).toFixed(2).toLocaleString('en-US')}`;
}
