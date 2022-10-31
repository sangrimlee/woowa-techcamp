export enum StorageKey {
  Theme = 'theme',
  SelectedRegion = 'selectedRegion',
}

export function setThemeLocalStorage(isDarkMode: boolean) {
  localStorage.setItem(StorageKey.Theme, JSON.stringify(isDarkMode));
}

export function getThemeLocalStorage(defaultTheme: boolean) {
  const isDarkMode = localStorage.getItem(StorageKey.Theme);
  if (isDarkMode === null) {
    return defaultTheme;
  }
  return Boolean(JSON.parse(isDarkMode));
}

export function setSelectedRegionLocalStorage(id: number) {
  localStorage.setItem(StorageKey.SelectedRegion, String(id));
}

export function getSelectedRegionLocalStorage() {
  return Number(localStorage.getItem(StorageKey.SelectedRegion));
}
