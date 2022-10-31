import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon, { IconType } from '../Icon';
import useScrollPosition from 'hooks/useScrollPosition';
import {
  HeaderBackground,
  HeaderButton,
  HeaderContentWrapper,
  HeaderInner,
  HeaderText,
  HeaderTitle,
  HeaderWrapper,
} from './Header.styled';

interface HeaderState {
  isTransparent: boolean;
  setIsTransparent: (_isTransparent: boolean) => void;
}

const HeaderContext = createContext<HeaderState | null>(null);

function useHeaderContext(component: string) {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(`<${component}/> is not child of <Dropdown/>`);
  }
  return context;
}

interface HeaderProviderProps {
  children?: React.ReactNode;
  initialValue: boolean;
}

function HeaderProvider({ children, initialValue }: HeaderProviderProps) {
  const [isTransparent, setIsTransparent] = useState<boolean>(initialValue);

  return (
    <HeaderContext.Provider value={{ isTransparent, setIsTransparent }}>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderContext.displayName = 'HeaderContext';

interface HeaderMainProps {
  absolute?: boolean;
  children?: React.ReactNode;
}

function HeaderMain({ absolute = false, children }: HeaderMainProps) {
  return (
    <HeaderProvider initialValue={absolute}>
      <HeaderWrapper $absolute={absolute}>
        <HeaderContent>{children}</HeaderContent>
      </HeaderWrapper>
    </HeaderProvider>
  );
}

function HeaderContent({ children }: { children?: React.ReactNode }) {
  const { isTransparent } = useHeaderContext('HeaderContent');
  return <HeaderContentWrapper $isTransparent={isTransparent}>{children}</HeaderContentWrapper>;
}

function HeaderAnimatedBackground() {
  const scrollPosition = useScrollPosition();
  const [headerOpacity, setHeaderOpacity] = useState<number>();
  const { setIsTransparent } = useHeaderContext('HeaderAnimatedBackground');

  useEffect(() => {
    const width = Math.min(488, window.screen.width);
    const opacity = Math.min(scrollPosition / width, 1);
    setIsTransparent(opacity < 0.25);
    setHeaderOpacity(opacity);
  }, [scrollPosition, setIsTransparent]);

  return <HeaderBackground style={{ opacity: headerOpacity }} />;
}

interface HeaderIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
}

function HeaderIconButton({ icon, ...buttonProps }: HeaderIconButtonProps) {
  return (
    <HeaderButton {...buttonProps}>
      <Icon icon={icon} size={28} />
    </HeaderButton>
  );
}

function HeaderBackwardButton() {
  const navigate = useNavigate();

  const onClickBackwardButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <HeaderIconButton aria-label="Go back" icon="ChevronLeftIcon" onClick={onClickBackwardButton} />
  );
}

export default Object.assign(HeaderMain, {
  Inner: HeaderInner,
  Background: HeaderBackground,
  AnimatedBackground: HeaderAnimatedBackground,
  Title: HeaderTitle,
  Text: HeaderText,
  IconButton: HeaderIconButton,
  BackwardButton: HeaderBackwardButton,
});
