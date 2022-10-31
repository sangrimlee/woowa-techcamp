import { SelectedOption } from 'hooks/useSelectProductOption';

export function createUniqueCartID(productId: string, selectedOptions: SelectedOption[]) {
  return `${productId}-${JSON.stringify(selectedOptions.sort())}`;
}

export function getSafeNumber(value: number, min = 1, max = 10) {
  return Math.min(max, Math.max(min, value));
}
