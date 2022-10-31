import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { PAGE_URL } from 'constants/url.constant';
import { Z_INDEX } from 'styles/z-index';

export default function CreateArticleButton() {
  return (
    <WriteArticlePageLink to={PAGE_URL.WRITE_ARTICLE}>
      <Icon icon="AddIcon" size={32} />
    </WriteArticlePageLink>
  );
}

const WriteArticlePageLink = styled(Link)`
  position: absolute;
  bottom: 5rem;
  right: 1rem;

  padding: 0.5rem;
  border-radius: 9999px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 25px 50px -12px;
  transition: opacity 0.2s ease-in-out;
  z-index: ${Z_INDEX.STICKY};

  &:hover {
    opacity: 0.75;
  }
`;
