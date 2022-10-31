import React from 'react';
import useArticleQuery from 'hooks/useArticleQuery';
import { elapsedTime } from 'utils/date.util';
import * as Styled from './ArticleDescription.styled';
import ArticleStatusDropdown from '../ArticleStatusDropdown';

export default function ArticleDescription() {
  const { article, isMyArticle } = useArticleQuery();

  return (
    <Styled.Wrapper>
      <Styled.SellerWrapper>
        <Styled.SellerProfileImage>
          <img
            src="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png"
            alt="프로필 이미지"
          />
        </Styled.SellerProfileImage>
        <Styled.SellerInfo>
          <strong>{article.seller.username}</strong>
          <span>{article.region.name}</span>
        </Styled.SellerInfo>
      </Styled.SellerWrapper>

      {isMyArticle && <ArticleStatusDropdown />}
      <Styled.Title>{article.title}</Styled.Title>
      <Styled.CategoryWrapper>
        {article.category.name}
        {' ∙ '}
        {elapsedTime(article.createdAt)}
      </Styled.CategoryWrapper>
      <Styled.Content>
        {article.content.split('\n').map((paragraph, i) => (
          <React.Fragment key={i}>
            {paragraph}
            <br />
          </React.Fragment>
        ))}
      </Styled.Content>
      <Styled.CategoryWrapper>
        조회 {article.viewCount}
        {' ∙ '}
        관심 {article.likeCount}
        {' ∙ '}
        채팅 {article.chatCount}
      </Styled.CategoryWrapper>
    </Styled.Wrapper>
  );
}
