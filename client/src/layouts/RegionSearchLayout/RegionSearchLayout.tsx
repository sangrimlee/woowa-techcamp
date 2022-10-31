import React, { useEffect, useRef } from 'react';
import Header from 'components/common/Header';
import Scrollable from 'components/common/Scrollable';
import * as Styled from './RegionSearchLayout.styled';
import SearchInput from 'components/region/SearchInput';
import { useModalContext } from 'hooks/useModalContext';
import { Region } from 'types/region';
import { useInfinityScroll } from 'hooks/useInfinityScroll';
import { useSetRecoilState } from 'recoil';
import { searchKeywordState } from 'recoil/atoms/region.atom';

interface RegionSearchLayout {
  searchResult: { regions: Region[]; totalCount: number };
  backward: boolean;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickResult: (e: React.MouseEvent<HTMLLIElement>) => void;
  onIntersect: () => void;
}

export default function RegionSearchLayout({
  searchResult,
  backward,
  onChangeKeyword,
  onClickResult,
  onIntersect,
}: RegionSearchLayout) {
  const ref = useRef<HTMLDivElement>(null);

  const target = useRef<HTMLDivElement>(null);
  const { modalState, setModalState } = useModalContext();

  const { observe, unobserve } = useInfinityScroll(onIntersect);
  const { regions, totalCount } = searchResult;

  useEffect(() => {
    if (!target.current) return;
    observe(target.current);
  }, [observe]);

  useEffect(() => {
    if (totalCount === regions.length) {
      if (!target.current) return;
      unobserve(target.current);
    }
  }, [unobserve, totalCount, regions.length]);

  const setSearchKeywordState = useSetRecoilState(searchKeywordState);

  useEffect(() => {
    return () => {
      setSearchKeywordState('');
    };
  }, [setSearchKeywordState]);

  return (
    <>
      <Header>
        {backward && (
          <Header.IconButton
            icon="ChevronLeftIcon"
            onClick={() => setModalState({ ...modalState, regionSearch: false })}
          />
        )}
        <SearchInput
          onChangeKeyword={(e) => {
            onChangeKeyword(e);
            ref.current?.scrollTo({ top: 0 });
          }}
        />
      </Header>
      <Scrollable>
        <Styled.RegionSearchLayout ref={ref}>
          {regions.length === 0 ? (
            <Styled.DisplayTextWrapper>
              <p>검색 결과가 없어요.</p>
              <p>동네 이름을 다시 확인해주세요!</p>
            </Styled.DisplayTextWrapper>
          ) : (
            <Styled.ResultList>
              {regions.map(({ id, name }) => (
                <Styled.ResultItem key={id} onClick={onClickResult} data-id={id}>
                  {name}
                </Styled.ResultItem>
              ))}
            </Styled.ResultList>
          )}
          <div id="observer-target" style={{ height: '1rem' }} ref={target}></div>
        </Styled.RegionSearchLayout>
      </Scrollable>
    </>
  );
}
