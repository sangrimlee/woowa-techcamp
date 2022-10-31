import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedCategoryState } from 'recoil/atoms/categories.atom';
import { useModalContext } from 'hooks/useModalContext';
import * as Styled from './CategoryList.styled';
import { articlesPageState, articlesState } from 'recoil/selectors/articles.selector';
import { useCategoryValue } from 'hooks/useCategoryValue';

export default function CategoryList() {
  const categories = useCategoryValue();
  const { modalState, setModalState } = useModalContext();
  const setArticles = useSetRecoilState(articlesState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const setPage = useSetRecoilState(articlesPageState);

  return (
    <Styled.CategoryList>
      <Styled.CategoryItem
        $selected={selectedCategory === null}
        onClick={() => {
          if (selectedCategory === null) return;
          setArticles({ articles: [], totalCount: 0 });
          setSelectedCategory(null);
          setPage(1);
          setModalState({ ...modalState, categorySelect: false });
        }}
      >
        <img src="https://web-fleemarket-05.s3.ap-northeast-2.amazonaws.com/images/category/star.png" />
        전체
      </Styled.CategoryItem>
      {categories.map(({ id, name, imgUrl }) => (
        <Styled.CategoryItem
          key={id}
          $selected={id === selectedCategory?.id}
          onClick={() => {
            if (selectedCategory?.id === id) return;
            setArticles({ articles: [], totalCount: 0 });
            setSelectedCategory({ id, name, imgUrl });
            setPage(1);
            setModalState({ ...modalState, categorySelect: false });
          }}
        >
          <img src={imgUrl} />
          {name}
        </Styled.CategoryItem>
      ))}
    </Styled.CategoryList>
  );
}
