import Dropdown from 'components/common/Dropdown';
import styled from 'styled-components';

export const DropdownButton = styled(Dropdown.Button)`
  width: 4.375rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const DropdownMenus = styled(Dropdown.Menus)`
  position: absolute;
  left: 0;
  width: 10rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.color.bg.front};
  transform-origin: top left !important;
`;

export const DropdownMenu = styled(Dropdown.Menu)`
  width: 100%;
  padding: 0.625rem;
  text-align: left;
  transition: opacity 0.2s ease-in;
  color: ${({ theme }) => theme.color.grey[600]};

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    pointer-events: none;
    font-weight: 700;
    color: ${({ theme }) => theme.color.grey[900]};
  }
`;

export const SelectedRegion = styled.h1`
  font-weight: 600;
  font-size: 1.25rem;
`;

export const Menu = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 0.25rem;
  gap: 0.25rem;
`;
