import { atom, selector } from 'recoil';
import { Region } from 'types/region';
import { getSelectedRegionLocalStorage } from 'utils/storage.util';
import { currentUserState } from './user.atom';

export const regionResultsState = atom<{ regions: Region[]; totalCount: number }>({
  key: 'regionResultsState',
  default: { regions: [], totalCount: 0 },
});

export const regionResultsPageState = atom<number>({
  key: 'regionResultsPageState',
  default: 1,
});

export const searchKeywordState = atom<string>({
  key: 'searchKeywordState',
  default: '',
});

export const userRegion = selector<{ regions: Region[]; selectedRegion: null | number }>({
  key: 'userRegionValue',
  get: ({ get }) => {
    const { user } = get(currentUserState);
    if (!user || user.regions.length === 0) {
      return { regions: [], selectedRegion: null };
    }

    const selectedRegion = getSelectedRegionLocalStorage();
    const isValidRegion = user.regions.some(({ id }) => id === Number(selectedRegion));
    if (!isValidRegion) {
      return { regions: user.regions, selectedRegion: user.regions[0].id };
    }
    return { regions: user.regions, selectedRegion: Number(selectedRegion) };
  },
});

export const selectdRegion = atom<null | number>({
  key: 'userSelectedRegionState',
  default: null,
});
