import React from 'react';
import Header from 'components/common/Header';
import useArticleQuery from 'hooks/useArticleQuery';
import Scrollable from 'components/common/Scrollable';
import Icon from 'components/common/Icon';
import Dropdown from 'components/common/Dropdown';
import { DropdownButton, DropdownMenus, DropdownMenu } from './ArticleLayout.styled';
import { useNavigate } from 'react-router-dom';
import { PAGE_URL } from 'constants/url.constant';
import { requestDeletArticle } from 'apis/article';
import useMutation from 'hooks/useMutation';

interface AritcleLayoutProps {
  children?: React.ReactNode;
}

export default function ArticleLayout({ children }: AritcleLayoutProps) {
  const navigate = useNavigate();
  const { article, isMyArticle } = useArticleQuery();
  const { mutate } = useMutation(requestDeletArticle, {
    onFailure: (message) => {
      alert(message);
    },
    onSuccess: () => {
      navigate(PAGE_URL.HOME);
    },
  });

  const onClickEditButton = () => {
    navigate(PAGE_URL.EDIT_ARTICLE_BY_ID(article.id));
  };

  const onClickDeleteButton = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirm) {
      await mutate(article.id);
    }
  };

  return (
    <>
      <Header absolute={!!article}>
        <Header.AnimatedBackground />
        <Header.Inner>
          <Header.BackwardButton />
        </Header.Inner>
        <Header.Inner>
          {isMyArticle && (
            <Dropdown>
              <DropdownButton>
                <Icon icon="OptionIcon" size={24} />
              </DropdownButton>
              <DropdownMenus>
                <DropdownMenu onClick={onClickEditButton}>게시글 수정</DropdownMenu>
                <DropdownMenu $isDelete onClick={onClickDeleteButton}>
                  삭제
                </DropdownMenu>
              </DropdownMenus>
            </Dropdown>
          )}
        </Header.Inner>
      </Header>
      <Scrollable headerHeight="0px">{children}</Scrollable>
    </>
  );
}
