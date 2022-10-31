import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const WelcomePageContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2.5rem;

  animation: ${FADE_IN} 0.2s ease-in;
`;

export const StoreName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
`;

export const BranchName = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const WelcomeButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  column-gap: 2.5rem;
`;
