export const baseColor = {
  white: '#ffffff',
  black: '#000000',
  primary: '#4caf50',
  secondary: '#80e27e',
  tertiary: '#087f23',
  error: '#F45452',
};

export const lightColor = {
  ...baseColor,
  grey: {
    50: '#fafaf9',
    100: '#f5f5f4',
    150: '#f1efee',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  bg: {
    front: '#ffffff',
    back: '#f1f1f1',
  },
};

export const darkColor = {
  ...baseColor,
  grey: {
    50: '#1c1917',
    100: '#292524',
    150: '#373330',
    200: '#44403c',
    300: '#57534e',
    400: '#78716c',
    500: '#a8a29e',
    600: '#d6d3d1',
    700: '#e7e5e4',
    800: '#f5f5f4',
    900: '#fafaf9',
  },
  bg: {
    front: '#222222',
    back: '#000000',
  },
};

export type ColorTheme = typeof lightColor;
