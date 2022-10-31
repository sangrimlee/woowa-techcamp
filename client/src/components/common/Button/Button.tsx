import React from 'react';
import { CSSProp } from 'styled-components';
import { BaseButton, ButtonSize, ButtonVariant } from './Button.styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  css?: CSSProp;
  rounded?: boolean;
}

export default function Button({
  css,
  fullWidth,
  rounded,
  children,
  size = 'lg',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <BaseButton
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
      $css={css}
      $rounded={rounded}
      {...buttonProps}
    >
      {children}
    </BaseButton>
  );
}
