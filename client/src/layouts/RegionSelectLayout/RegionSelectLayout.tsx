import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Header from 'components/common/Header';
import SideModal from 'components/common/SideModal';
import RegionSearchPage from 'pages/RegionSearchPage';
import * as Styled from './RegionSelectLayout.styled';
import { useModalContext } from 'hooks/useModalContext';
import Icon from 'components/common/Icon';
import { userRegion } from 'recoil/atoms/region.atom';
import { setSelectedRegionLocalStorage } from 'utils/storage.util';
import { useRegionValue } from 'hooks/uesRegionValue';
import { shortRegion } from 'utils/region.util';
import { currentUserState } from 'recoil/atoms/user.atom';
import { articlesPageState, articlesState } from 'recoil/selectors/articles.selector';

export default function RegionSelectLayout() {
  const { deleteUserRegion } = useRegionValue();
  const [user, setUser] = useRecoilState(currentUserState);
  const { regions, selectedRegion } = useRecoilValue(userRegion);
  const { modalState, setModalState } = useModalContext();
  const setArticles = useSetRecoilState(articlesState);
  const setPage = useSetRecoilState(articlesPageState);

  const onClickRegion = (id: number) => {
    setSelectedRegionLocalStorage(id);
    setArticles({ articles: [], totalCount: 0 });
    setPage(1);
    setUser({ ...user });
  };

  return (
    <>
      <Header>
        <Header.Title>내 동네 선택하기</Header.Title>
        <Header.IconButton
          icon="ChevronLeftIcon"
          onClick={() => setModalState({ ...modalState, regionSelect: false })}
        />
      </Header>
      <Styled.RegionSelectLayout>
        <Styled.Title>동네 선택</Styled.Title>
        <Styled.DisplayTextWrapper>
          <Styled.DisplayText>지역은 최소 1개이상 최대 2개까지 설정 가능해요.</Styled.DisplayText>
        </Styled.DisplayTextWrapper>
        <Styled.RegionWrapper>
          {regions.map(({ id, name }) => (
            <Styled.Region
              key={id}
              onClick={() => onClickRegion(id)}
              selected={id === selectedRegion}
            >
              {shortRegion(name)}
              <button onClick={() => deleteUserRegion(id)}>
                <Icon icon="CloseCircleOutlineIcon" size={20} />
              </button>
            </Styled.Region>
          ))}
          {regions.length < 2 && (
            <Styled.AddButton
              onClick={() => {
                setModalState({ ...modalState, regionSearch: true });
              }}
            >
              <button>
                <Icon icon="AddCircleIcon" size={20} />
              </button>
            </Styled.AddButton>
          )}
        </Styled.RegionWrapper>

        {modalState.regionSearch && (
          <SideModal>
            <RegionSearchPage backward />
          </SideModal>
        )}
      </Styled.RegionSelectLayout>
    </>
  );
}
