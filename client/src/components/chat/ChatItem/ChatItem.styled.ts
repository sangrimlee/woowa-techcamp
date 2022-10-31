import styled from 'styled-components';

export const ChatItemWrapper = styled.li`
  height: 5.5rem;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  padding: 1rem;

  border-top: 1px solid ${({ theme }) => theme.color.grey[200]};
`;

export const UserImageWrapper = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
`;

export const ChatInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  strong {
    font-weight: 700;
  }
  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.grey[400]};
  }
`;

export const LastMessagge = styled.p<{ $isEmpty?: boolean }>`
  margin-top: 0.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: ${({ $isEmpty, theme }) => ($isEmpty ? theme.color.grey[500] : theme.color.grey[900])};
`;

export const ArticleImageWrapper = styled(UserImageWrapper)`
  border-radius: 0.125rem;
`;
