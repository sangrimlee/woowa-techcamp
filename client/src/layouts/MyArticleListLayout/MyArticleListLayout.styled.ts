import styled from 'styled-components';

export const MyArticlesLayout = styled.div`
  padding: 0 1rem;
`;

export const DisplayTextWrapper = styled.div`
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 5rem;
  color: ${({ theme }) => theme.color.grey[700]};
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 1.25rem;
`;
