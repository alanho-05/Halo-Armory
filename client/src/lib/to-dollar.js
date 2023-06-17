export default function toDollars(value) {
  return `$${(value / 100).toLocaleString('en-US')}`;
}
