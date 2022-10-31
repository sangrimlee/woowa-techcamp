import React from 'react';
import { BaseSquareButton, SquareButtonSize, SquareButtonVariant } from './SquareButton.styled';

interface SquareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: SquareButtonSize;
  variant?: SquareButtonVariant;
}

export default function SquareButton({
  size = 'lg',
  variant = 'primary',
  children,
  ...buttonProps
}: SquareButtonProps) {
  return (
    <BaseSquareButton $size={size} $variant={variant} {...buttonProps}>
      {children}
    </BaseSquareButton>
  );
}
