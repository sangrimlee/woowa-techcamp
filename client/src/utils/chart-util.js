export function easeOut(value) {
  return (2 * value - value ** 2) ** (1 / 2);
}

export function easeInOut(value) {
  return -2 * value ** 3 + 3 * value ** 2;
}
