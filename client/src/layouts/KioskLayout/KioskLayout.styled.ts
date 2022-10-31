import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const KioskLayoutContainer = styled.main`
  width: 100%;
  height: 100%;
  max-width: 90rem;
  margin: 0 auto;
  border: solid ${({ theme }) => theme.colors.gray[200]};
  border-width: 0 1px;
  display: flex;

  animation: ${FADE_IN} 0.15s ease-in;
`;

export const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const SidebarContainer = styled.aside<{ $width: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  border-left: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`;
