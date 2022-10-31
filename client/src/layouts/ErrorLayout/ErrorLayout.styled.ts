import styled from 'styled-components';

export const MainWrapper = styled.main`
  height: 100%;
  padding: 1rem;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  margin: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0rem;
`;

export const ParagraphWrapper = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.grey[600]};

  & > button {
    background-color: none;
    margin-top: 1rem;
    margin-left: 0.5rem;
    font-weight: 700;
  }
`;
