import 'styled-components';
import { ColorTheme } from '../styles';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTheme;
  }
}
