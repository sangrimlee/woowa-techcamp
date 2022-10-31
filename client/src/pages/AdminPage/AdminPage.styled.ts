import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  animation: ${FADE_IN} 0.2s ease-in;

  & > h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  & > a {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`;
