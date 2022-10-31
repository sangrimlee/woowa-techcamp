import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  backdrop-filter: blur(2px);
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 4.5rem;
  border-radius: 0.25rem;
  background-color: white;
  animation: ${FADE_IN} 0.25s ease-in;

  & > h4 {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 3rem;
  }
`;
