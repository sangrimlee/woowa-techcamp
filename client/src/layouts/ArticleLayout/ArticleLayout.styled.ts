import styled from 'styled-components';
import Dropdown from 'components/common/Dropdown';

export const DropdownButton = styled(Dropdown.Button)`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownMenus = styled(Dropdown.Menus)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 10rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.color.bg.front};
  transform-origin: top right;
`;

export const DropdownMenu = styled(Dropdown.Menu)<{ $isDelete?: boolean }>`
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  text-align: left;
  transition: opacity 0.2s ease-in;
  color: ${({ $isDelete, theme }) => ($isDelete ? theme.color.error : theme.color.grey[900])};

  &:hover {
    opacity: 0.75;
  }
`;
