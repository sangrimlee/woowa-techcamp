export function convertStringToNumber(value: string) {
  const convertedValue = parseInt(value.replace(/[^0-9]/g, ''));
  return isNaN(convertedValue) ? 0 : convertedValue;
}
