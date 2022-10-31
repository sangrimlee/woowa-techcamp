import styled, { css } from 'styled-components';
import Dropdown from 'components/common/Dropdown';
import { ArticleStatus } from 'types/article';

export const ArticleItem = styled.li`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey[200]};

  :last-child {
    border-bottom-width: 0;
  }

  & > a {
    position: relative;
    display: flex;
    gap: 1rem;
    height: 11rem;
    padding: 1.5rem 0;
    cursor: pointer;
  }
`;

export const Thumbnail = styled.img`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.25rem;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[200]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-right: 1rem;
`;

export const MoreInfo = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.color.grey[400]};
`;

export const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Price = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

export const Like = styled.div`
  position: absolute;
  right: 0;
  bottom: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
  align-items: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.color.grey[500]};
`;

export const Status = styled.div<{ $status: ArticleStatus }>`
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;

  ${({ theme, $status }) => css`
    color: ${$status === ArticleStatus.Reserved ? theme.color.white : theme.color.grey[900]};
    background-color: ${$status === ArticleStatus.Reserved
      ? theme.color.primary
      : theme.color.grey[300]};
  `};
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 1.375rem;
  right: 0;
`;

export const DropdownButton = styled(Dropdown.Button)`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownMenus = styled(Dropdown.Menus)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 10rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.color.bg.front};
  transform-origin: top right;
`;

export const DropdownMenu = styled(Dropdown.Menu)<{ $isDelete?: boolean }>`
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  text-align: left;
  transition: opacity 0.2s ease-in;
  color: ${({ $isDelete, theme }) => ($isDelete ? theme.color.error : theme.color.grey[900])};

  &:hover {
    opacity: 0.75;
  }
`;
