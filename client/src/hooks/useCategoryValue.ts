import { useRecoilValue } from 'recoil';
import { categoriesValue } from 'recoil/selectors/categories.selector';
import { Category } from 'types/Category';

export function useCategoryValue() {
  const categories = useRecoilValue<Category[]>(categoriesValue);

  return categories;
}
