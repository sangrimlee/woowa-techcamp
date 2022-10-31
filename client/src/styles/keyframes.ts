import { keyframes } from 'styled-components';

export const FADE_IN_OUT = keyframes`
  from {
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

export const SKELETON = keyframes`
  from {
    opacity: 0.95;
  }
  50%{
    opacity: 1;
  }
  to{
    opacity: 0.95;
  }
`;

export const PULSE = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

export const FADE_IN = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FADE_OUT = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const SCALE_UP = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
`;

export const SCALE_DOWN = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }
  to {
    transform: scale(0);
    opacity: 1;
  }
`;
