import styled from 'styled-components';
import { Z_INDEX } from 'styles/z-index';

export const ToggleButton = styled.button`
  z-index: ${Z_INDEX.FIXED};
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  display: none;
  padding: 1rem;
  border-radius: 9999px;
  color: #febc56;
  background-color: ${({ theme }) => theme.color.bg.front};

  transition: opacity 0.15s ease-in-out;

  @media (min-width: 768px) {
    display: flex;
  }

  &:hover {
    opacity: 0.75;
  }
`;
