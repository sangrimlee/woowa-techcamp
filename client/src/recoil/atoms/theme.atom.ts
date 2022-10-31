import { atom } from 'recoil';
import { getOSTheme } from 'utils/theme.util';
import { getThemeLocalStorage } from 'utils/storage.util';

export const themeState = atom<boolean>({
  key: 'themeState',
  default: getThemeLocalStorage(getOSTheme()),
});
