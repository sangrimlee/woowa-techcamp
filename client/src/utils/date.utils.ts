export function fillZero(value: number, length = 2) {
  return value.toString().padStart(length, '0');
}

export function createDateString(date: Date) {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
}
