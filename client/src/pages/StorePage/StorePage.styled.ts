import styled from 'styled-components';
import { SLIDE_UP } from 'styles/keyframes';

export const StorePageContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;
  padding: 2.5rem;

  & > a,
  & > button {
    display: block;
    font-size: 2rem;
    font-weight: 500;
    transition: all 0.15s ease-in;
    animation: ${SLIDE_UP} 0.5s ease-in;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
    }
  }
`;
