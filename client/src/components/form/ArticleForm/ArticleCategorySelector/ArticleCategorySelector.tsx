import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { useFormContext, useWatch } from 'react-hook-form';
import { categoriesValue } from 'recoil/selectors/categories.selector';
import { CategorySelectorList, CategorySelectorItem } from './ArticleCategorySelector.styled';
import { ArticleSchema } from 'constants/schema.constant';

export default function ArticleCategorySelector() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const { setValue, control } = useFormContext<ArticleSchema>();
  const selectedCategoryId = useWatch<ArticleSchema>({ name: 'categoryId', control });
  const categories = useRecoilValue(categoriesValue);

  const scrollList = useCallback((scrollToOptions: ScrollToOptions) => {
    const { current: listElement } = listRef;
    if (!listElement) return;
    listElement.scrollTo(scrollToOptions);
  }, []);

  const onSelectCategory = (id: number, name: string) => () => {
    setValue('categoryId', id);
    setValue('categoryName', name);
  };

  return (
    <CategorySelectorList ref={listRef}>
      {categories.map(({ id, name }) => (
        <ArticleCategorySelectorItem
          key={id}
          isActive={selectedCategoryId === id}
          onSelect={onSelectCategory(id, name)}
          scrollList={scrollList}
        >
          {name}
        </ArticleCategorySelectorItem>
      ))}
    </CategorySelectorList>
  );
}

interface ArticleCategorySelectorItemProps {
  isActive?: boolean;
  onSelect: () => void;
  scrollList: (scrollToOptions: ScrollToOptions) => void;
  children?: React.ReactNode;
}

function ArticleCategorySelectorItem({
  isActive,
  onSelect,
  scrollList,
  children,
}: ArticleCategorySelectorItemProps) {
  const itemRef = useRef<HTMLLIElement | null>(null);

  const scrollInToView = useCallback(() => {
    const { current: itemElement } = itemRef;
    if (!itemElement) return;

    scrollList({
      left: itemElement.offsetLeft - 16,
      behavior: 'smooth',
    });
  }, [scrollList]);

  const handleClick = () => {
    onSelect();
    scrollInToView();
  };

  useEffect(() => {
    if (isActive) {
      scrollInToView();
    }
  }, [isActive, scrollInToView]);

  return (
    <CategorySelectorItem
      ref={itemRef}
      className={classNames({
        active: isActive,
      })}
      onClick={handleClick}
    >
      {children}
    </CategorySelectorItem>
  );
}
