import { getCategories } from 'apis/category';
import { selector } from 'recoil';

export const categoriesValue = selector({
  key: 'categoriesValue',
  get: async () => {
    const categories = await getCategories();
    return categories;
  },
});
