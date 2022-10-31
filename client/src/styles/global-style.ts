import * as styled from 'styled-components';
import reset from './reset';

const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
`;

export default GlobalStyle;
