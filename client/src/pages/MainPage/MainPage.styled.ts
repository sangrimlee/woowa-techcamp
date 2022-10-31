import styled from 'styled-components';
import { NavLink } from 'lib/router';
import { SLIDE_UP } from 'styles/keyframes';

export const MainPageContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 2.5rem;
  font-size: 2rem;
  line-height: 1.5;
  text-align: center;

  animation: ${SLIDE_UP} 0.25s ease-in;
`;

export const GetStarted = styled(NavLink)`
  width: 18rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  border-radius: 0.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.15s ease-in-out;
  animation: ${SLIDE_UP} 0.5s ease-in;

  &:hover {
    opacity: 0.75;
  }
`;
