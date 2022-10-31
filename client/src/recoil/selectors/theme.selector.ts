import { selector } from 'recoil';
import { themeState } from 'recoil/atoms/theme.atom';
import { darkTheme, lightTheme } from 'styles';

export const themeValue = selector({
  key: 'themeValue',
  get: ({ get }) => {
    const isDarkMode = get(themeState);
    return {
      isDarkMode,
      theme: isDarkMode ? darkTheme : lightTheme,
    };
  },
});
