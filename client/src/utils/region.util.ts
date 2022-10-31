export const shortRegion = (region: string) => {
  const token = region.split(' ');
  return token[token.length - 1];
};
