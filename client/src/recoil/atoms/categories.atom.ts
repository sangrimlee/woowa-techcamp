import { atom } from 'recoil';
import { Category } from 'types/category';

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});

export const selectedCategoryState = atom<Category | null>({
  key: 'selectedCategoryState',
  default: null,
});
