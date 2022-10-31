import styled from 'styled-components';
import { FADE_IN, FADE_OUT, SCALE_DOWN, SCALE_UP } from 'styles/keyframes';
import { Z_INDEX } from 'styles/z-index';

export const Wrapper = styled.div`
  position: relative;
`;

export const Backdrop = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  bottom: 0;
  max-width: 28rem;
  background-color: rgba(0, 0, 0, 0.25);
  transform: translateX(-50%);
  animation-timing-function: ease-in-out;
  z-index: ${Z_INDEX.POP_OVER};

  &.visible {
    animation-name: ${FADE_IN};
    animation-duration: 50ms;

    opacity: 1;
  }
  &.hidden {
    animation-name: ${FADE_OUT};
    animation-duration: 150ms;

    opacity: 0;
  }
`;

export const Menu = styled.div`
  background-color: ${({ theme }) => theme.color.bg.front};

  animation-duration: 150ms;
  animation-timing-function: ease-in-out;
  transform-origin: top left;
  z-index: ${Z_INDEX.POP_OVER};

  &.visible {
    animation-name: ${SCALE_UP};
    opacity: 1;
  }

  &.hidden {
    animation-name: ${SCALE_DOWN};
    opacity: 0;
  }
`;
