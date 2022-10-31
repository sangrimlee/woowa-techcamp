import styled from 'styled-components';
import { Z_INDEX } from 'styles/z-index';

export const SideModal = styled.div`
  z-index: ${Z_INDEX.MODAL};

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  position: absolute;

  animation: slide 0.3s ease-in forwards;
  overflow: hidden;

  background-color: ${({ theme }) => theme.color.bg.front};
  @keyframes slide {
    from {
      opacity: 0.8;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
