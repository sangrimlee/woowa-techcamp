import styled from 'styled-components';
import { Z_INDEX } from 'styles/z-index';

export const BottomNavigationWrapper = styled.nav`
  z-index: ${Z_INDEX.FIXED};
  background-color: ${({ theme }) => theme.color.white};
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-top: 0.5px solid ${({ theme }) => theme.color.grey[300]};
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const BottomNavigationList = styled.ul`
  display: flex;

  li {
    flex: 1;
    font-size: 0.75rem;
  }

  a {
    display: flex;
    gap: 0.125rem;
    flex-direction: column;
    align-items: center;
    padding: 0.625rem 0;
  }
`;
