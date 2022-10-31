const colors = {
  gray: {
    '50': '#FAFAFA',
    '100': '#F4F4F5',
    '200': '#E4E4E7',
    '300': '#D4D4D8',
    '400': '#A1A1AA',
    '500': '#71717A',
    '600': '#52525B',
    '700': '#3F3F46',
    '800': '#27272A',
    '900': '#18181B',
  },
  white: '#FFFFFF',
  black: '#121212',
  primary: '#2AC1BC',
  secondary: '#A0E1E0',
  tertiary: '#219A95',
  error: '#F45452',
};

export type ColorTheme = typeof colors;

export default colors;
