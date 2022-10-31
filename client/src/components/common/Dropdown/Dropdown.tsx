import classNames from 'classnames';
import React, { createContext, useCallback, useContext, useState } from 'react';
import useDelayedRender from 'hooks/useDelayRender';
import * as Styled from './Dropdown.styled';

interface DropdownState {
  isVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DropdownContext = createContext<DropdownState | null>(null);

DropdownContext.displayName = 'DropdownContext';

function useDropdownContext(component: string) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(`<${component}/> is not child of <Dropdown/>`);
  }
  return context;
}

function DropdownProvider({ children }: { children?: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <DropdownContext.Provider value={{ isVisible, onOpen, onClose }}>
      {children}
    </DropdownContext.Provider>
  );
}

interface DropdownProps {
  children?: React.ReactNode;
}

function Dropdown({ children }: DropdownProps) {
  return (
    <DropdownProvider>
      <Styled.Wrapper>{children}</Styled.Wrapper>
    </DropdownProvider>
  );
}

interface DropdownOnClickProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void | Promise<void>;
}

function DropdownButton({ onClick, children, ...buttonProps }: DropdownOnClickProps) {
  const { onOpen } = useDropdownContext('DropdownButton');

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
    onOpen();
  };

  return (
    <button onClick={handleClick} {...buttonProps}>
      {children}
    </button>
  );
}

interface DropdownMenusProps {
  children?: React.ReactNode;
  className?: string;
}

function DropdownMenus({ children, className, ...props }: DropdownMenusProps) {
  const { isVisible, onClose } = useDropdownContext('DropdownMenus');
  const { mounted, rendered } = useDelayedRender(isVisible, {
    exitDelay: 200,
  });

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Styled.Backdrop
        className={classNames({
          visible: rendered,
          hidden: !rendered,
        })}
        onClick={onClose}
      />
      <Styled.Menu
        className={classNames(className, {
          visible: rendered,
          hidden: !rendered,
        })}
        {...props}
      >
        {children}
      </Styled.Menu>
    </>
  );
}

function DropdownMenu({ onClick, children, ...buttonProps }: DropdownOnClickProps) {
  const { onClose } = useDropdownContext('DropdownMenu');

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
    onClose();
  };

  return (
    <button onClick={handleClick} {...buttonProps}>
      {children}
    </button>
  );
}

export default Object.assign(Dropdown, {
  Button: DropdownButton,
  Menus: DropdownMenus,
  Menu: DropdownMenu,
});
