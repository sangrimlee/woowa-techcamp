import React from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Router from './router/Router';
import ToggleThemeButton from './components/common/ToggleThemeButton';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import PendingFallback from 'components/boundary/PendingFallback';
import RejectedFallback from 'components/boundary/RejectedFallback';
import { GlobalStyle } from './styles';
import { themeValue } from './recoil/selectors/theme.selector';
import { ModalContextProvider } from 'contexts/ModalContext';

export default function App() {
  const { theme } = useRecoilValue(themeValue);
  return (
    <ThemeProvider theme={theme}>
      <ModalContextProvider>
        <GlobalStyle />
        <ToggleThemeButton />
        <AsyncBoundary
          rejectedFallback={<RejectedFallback />}
          pendingFallback={<PendingFallback />}
        >
          <Router />
        </AsyncBoundary>
      </ModalContextProvider>
    </ThemeProvider>
  );
}
