import * as styled from 'styled-components';
import { reset } from './reset';

export const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  html {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.bg.back};
  }

  body {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 28rem;
    margin: 0 auto;
    color: ${({ theme }) => theme.color.grey[900]};
    background-color: ${({ theme }) => theme.color.bg.front};
    overflow: hidden;
  }

  #root {
    height: 100%;
    color: ${({ theme }) => theme.color.grey[900]};
    background-color: ${({ theme }) => theme.color.bg.front};
    overflow: hidden;
    position: relative;
  }

  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.color.grey[400]};
  }
`;
