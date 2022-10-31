import React from 'react';
import Icon from 'components/common/Icon';
import Dropdown from 'components/common/Dropdown';
import useArticleQuery from 'hooks/useArticleQuery';
import { ArticleStatus } from 'types/article';
import { DropdownButton, DropdownMenus, DropdownMenu } from './ArticleStatusDropdown.styled';
import { ARTICLE_STATUS } from 'constants/article-status.constant';
import { requestChangeArticleStatus } from 'apis/article';
import useMutation from 'hooks/useMutation';

export default function ArticleStatusDropdown() {
  const { article, refresh } = useArticleQuery();
  const { isLoading, mutate } = useMutation(requestChangeArticleStatus(article.id), {
    onFailure: () => {
      alert('상품 상태 변경에 실패하였습니다.');
    },
    onSuccess: () => {
      refresh();
    },
  });

  const onChangeArticleStatus = (status: ArticleStatus) => async () => {
    await mutate(status);
  };

  return (
    <Dropdown>
      <DropdownButton disabled={isLoading}>
        {ARTICLE_STATUS[article.status]}
        <Icon icon="ChevronDownIcon" size={16} />
      </DropdownButton>
      <DropdownMenus>
        {Object.entries(ARTICLE_STATUS).map(([status, label]) => (
          <DropdownMenu
            key={`article-status-dropdown-${status}`}
            disabled={article.status === status}
            onClick={onChangeArticleStatus(status as ArticleStatus)}
          >
            {label}
          </DropdownMenu>
        ))}
      </DropdownMenus>
    </Dropdown>
  );
}
