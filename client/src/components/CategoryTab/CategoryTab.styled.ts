import styled from 'styled-components';
import Tab from 'components/common/Tab';

export const TabList = styled(Tab.List)`
  position: sticky;
  top: 5rem;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

export const TabItem = styled(Tab.Tab)`
  --tab-color: ${({ theme }) => theme.colors.gray[500]};
  flex: 0 0 auto;
  font-size: 1.125rem;
  padding: 1rem 2.5rem;
  cursor: pointer;
  color: var(--tab-color);
  transition: all 0.15s ease-in-out;

  &.active {
    font-weight: 500;
    --tab-color: ${({ theme }) => theme.colors.primary};
  }
`;
