import React from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from 'recoil/atoms/theme.atom';
import { setThemeLocalStorage } from 'utils/storage.util';
import Icon from '../Icon';
import * as Styled from './ToggleThemeButton.styled';

export default function ToggleThemeButton() {
  const [isDarkMode, setDarkMode] = useRecoilState(themeState);

  const onToggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    setThemeLocalStorage(!isDarkMode);
  };

  return (
    <Styled.ToggleButton onClick={onToggleDarkMode}>
      {isDarkMode ? <Icon icon="SunIcon" size={24} /> : <Icon icon="MoonIcon" size={24} />}
    </Styled.ToggleButton>
  );
}
