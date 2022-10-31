import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeadingContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  margin-bottom: 1rem;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background-color: ${({ theme }) => theme.colors.white};

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const BottomContainer = styled.div`
  position: sticky;
  padding: 1.5rem 2.5rem 2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const TotalPrice = styled.strong`
  display: block;
  text-align: right;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

export const Timer = styled.p`
  display: block;
  text-align: center;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.error};
`;
