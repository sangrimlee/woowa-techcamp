import { ARTICLE_STATUS } from 'constants/article-status.constant';
import React from 'react';
import { PAGE_URL } from 'constants/url.constant';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'recoil/atoms/user.atom';
import { Article } from 'types/article';
import { elapsedTime } from 'utils/date.util';
import { shortRegion } from 'utils/region.util';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import * as Styled from './ArticleItem.styled';

export default function ArticleItem({
  article: { id, title, region, price, thumbnail, createdAt, likeCount, status, seller },
}: {
  article: Article;
}) {
  const { user } = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const isMyArticle = user?.id === seller.id;

  return (
    <Styled.ArticleItem>
      <Link to={`/articles/${id}`}>
        <Styled.Thumbnail src={thumbnail} />
        <Styled.Content>
          <Styled.Title>{title}</Styled.Title>
          <Styled.MoreInfo>
            {shortRegion(region.name)} ∙ {elapsedTime(createdAt)}
          </Styled.MoreInfo>
          <Styled.PriceInfo>
            {ARTICLE_STATUS[status] !== ARTICLE_STATUS.Sale && (
              <Styled.Status $status={status}>{ARTICLE_STATUS[status]}</Styled.Status>
            )}
            <Styled.Price>{price === 0 ? '나눔' : `${price.toLocaleString()}원`}</Styled.Price>
          </Styled.PriceInfo>
        </Styled.Content>
        <Styled.Like>
          <Icon icon="HeartOutlineIcon" />
          {likeCount}
        </Styled.Like>
      </Link>
      {isMyArticle && (
        <Styled.DropdownWrapper>
          <Dropdown>
            <Styled.DropdownButton>
              <Icon icon="OptionIcon" size={20} />
            </Styled.DropdownButton>
            <Styled.DropdownMenus>
              <Styled.DropdownMenu onClick={() => navigate(PAGE_URL.EDIT_ARTICLE_BY_ID(id))}>
                게시글 수정
              </Styled.DropdownMenu>
              <Styled.DropdownMenu $isDelete>삭제</Styled.DropdownMenu>
            </Styled.DropdownMenus>
          </Dropdown>
        </Styled.DropdownWrapper>
      )}
    </Styled.ArticleItem>
  );
}
