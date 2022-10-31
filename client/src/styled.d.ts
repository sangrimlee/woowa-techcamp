import 'styled-components';
import { ColorTheme } from 'styles/colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTheme;
    zIndex: ZIndexTheme;
  }
}
