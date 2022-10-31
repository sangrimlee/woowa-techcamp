import styled from 'styled-components';
import Dropdown from 'components/common/Dropdown';

export const DropdownButton = styled(Dropdown.Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.25rem;
  width: 7rem;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.grey[200]};

  > span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

export const DropdownMenus = styled(Dropdown.Menus)`
  position: absolute;
  left: 0;
  right: 0;
  width: 8rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const DropdownMenu = styled(Dropdown.Menu)`
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  text-align: left;
  color: ${({ theme }) => theme.color.grey[600]};
  transition: opacity 0.2s ease-in;

  &:hover {
    opacity: 0.75;
  }
  &:disabled {
    pointer-events: none;
    font-weight: 700;
    color: ${({ theme }) => theme.color.grey[900]};
  }
`;
