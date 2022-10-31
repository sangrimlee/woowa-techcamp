import React from 'react';
import Dropdown from 'components/common/Dropdown';
import Header from 'components/common/Header';
import Icon from 'components/common/Icon';
import SideModal from 'components/common/SideModal';
import * as Styled from './HomePageLayout.styled';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userRegion } from 'recoil/atoms/region.atom';
import { shortRegion } from 'utils/region.util';
import { useModalContext } from 'hooks/useModalContext';
import { setSelectedRegionLocalStorage } from 'utils/storage.util';
import CategorySelectPage from 'pages/CategorySelectPage';
import RegionSelectpage from 'pages/RegionSelectPage';
import Scrollable from 'components/common/Scrollable';
import { currentUserState } from 'recoil/atoms/user.atom';
import { articlesPageState, articlesState } from 'recoil/selectors/articles.selector';
import { selectedCategoryState } from 'recoil/atoms/categories.atom';

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { modalState, setModalState } = useModalContext();
  const [user, setUser] = useRecoilState(currentUserState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const { regions, selectedRegion } = useRecoilValue(userRegion);
  const region = shortRegion(regions.find(({ id }) => id === selectedRegion)?.name ?? '');

  const setArticles = useSetRecoilState(articlesState);
  const setPage = useSetRecoilState(articlesPageState);

  const changeSelectedRegion = (id: number) => {
    setSelectedRegionLocalStorage(id);
    setUser({ ...user });
  };

  return (
    <>
      <Header>
        <Header.Inner>
          <Dropdown>
            <Styled.DropdownButton>
              <Styled.SelectedRegion>{region}</Styled.SelectedRegion>
              <Icon icon="ChevronDownIcon" size={24} />
            </Styled.DropdownButton>
            <Styled.DropdownMenus>
              {regions.map(({ id, name }) => (
                <Styled.DropdownMenu
                  key={id}
                  disabled={selectedRegion === id}
                  onClick={() => {
                    setArticles({ articles: [], totalCount: 0 });
                    setPage(1);
                    changeSelectedRegion(id);
                  }}
                >
                  {shortRegion(name)}
                </Styled.DropdownMenu>
              ))}
              <Styled.DropdownMenu
                onClick={() => {
                  setModalState({ ...modalState, regionSelect: true });
                }}
              >
                내 동네 설정하기
              </Styled.DropdownMenu>
            </Styled.DropdownMenus>
          </Dropdown>
        </Header.Inner>
        <Header.Inner>
          <Styled.Menu>
            {selectedCategory?.name}
            <button
              onClick={() => {
                setModalState({ ...modalState, categorySelect: true });
              }}
            >
              <Icon icon="MenuIcon" size={24} />
            </button>
          </Styled.Menu>
        </Header.Inner>
      </Header>
      <Scrollable headerHeight="6rem">{children}</Scrollable>
      {modalState.regionSelect && (
        <SideModal>
          <RegionSelectpage />
        </SideModal>
      )}
      {modalState.categorySelect && (
        <SideModal>
          <CategorySelectPage />
        </SideModal>
      )}
    </>
  );
}
