import React, { useEffect } from 'react';
import { useRecoilState, useRecoilStateLoadable, useSetRecoilState } from 'recoil';
import RegionSearchLayout from 'layouts/RegionSearchLayout';
import { getRegionsByKeword } from 'apis/region';
import { useModalContext } from 'hooks/useModalContext';
import { useRegionValue } from 'hooks/uesRegionValue';
import {
  regionResultsPageState,
  searchKeywordState,
  regionResultsState,
} from 'recoil/atoms/region.atom';
import { articlesState } from 'recoil/selectors/articles.selector';

export default function RegionSearchPage({ backward }: { backward: boolean }) {
  const { modalState, setModalState } = useModalContext();
  const { addUserRegion } = useRegionValue();
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [page, setPage] = useRecoilState(regionResultsPageState);
  const setArticles = useSetRecoilState(articlesState);

  const [{ state, contents: searchResult }, setState] = useRecoilStateLoadable(regionResultsState);

  const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setArticles({ articles: [], totalCount: 0 });
    setPage(1);
    setKeyword(value);
    const data = await getRegionsByKeword({ page: 1, keyword: value, per: 20 });
    setState(data);
  };

  const onClickResult = async (e: React.MouseEvent<HTMLLIElement>) => {
    const { id: clickedId } = (e.target as HTMLElement).dataset;
    if (!clickedId) return;

    const { regions } = searchResult;
    const region = regions.find(({ id }: { id: number }) => id === +clickedId);
    if (!region) return;
    await addUserRegion(region);
    setModalState({ ...modalState, regionSearch: false });
  };

  const onIntersect = async () => {
    const { regions } = searchResult;
    const data = await getRegionsByKeword({ page: page + 1, keyword, per: 20 });
    setState({ regions: [...regions, ...data.regions], totalCount: data.totalCount });
    setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      setPage(1);
      setKeyword('');
      const data = await getRegionsByKeword({ page: 1, keyword: '', per: 20 });
      setState(data);
    })();
  }, [setKeyword, setPage, setState]);

  if (state === 'loading') return <div>Loding</div>;
  if (state === 'hasError') {
    return <div>Something went wrong</div>;
  }

  return (
    <RegionSearchLayout
      searchResult={searchResult}
      backward={backward}
      onChangeKeyword={onChangeKeyword}
      onClickResult={onClickResult}
      onIntersect={onIntersect}
    />
  );
}
