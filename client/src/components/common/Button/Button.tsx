import React from 'react';
import { CSSProp } from 'styled-components';
import Icon from '../Icon';
import { StyledButton, ButtonSize, ButtonVariant } from './Button.styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  withIcon?: boolean;
  isLoading?: boolean;
  css?: CSSProp;
}

export default function Button({
  children,
  disabled,
  isLoading,
  size = 'lg',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <StyledButton size={size} variant={variant} disabled={isLoading || disabled} {...buttonProps}>
      {isLoading ? <Icon icon="LoadingIcon" size={24} /> : children}
    </StyledButton>
  );
}
