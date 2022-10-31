import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: sticky;
  height: 5rem;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 2.5rem;
`;

export const HeadingContainer = styled.div`
  display: flex;
  align-items: baseline;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;
