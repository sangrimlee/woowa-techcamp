import styled, { css, CSSProp } from 'styled-components';

const ButtonSizeStyles = {
  lg: css`
    --button-text-size: 1rem;
    --button-py: 1rem;
    --button-px: 1.5rem;
  `,
  xl: css`
    --button-text-size: 1.375rem;
    --button-py: 2rem;
    --button-px: 1.5rem;
  `,
};

const ButtonVariantStyles = {
  default: css`
    --button-color: ${({ theme }) => theme.colors.gray[700]};
    --button-bg-color: ${({ theme }) => theme.colors.gray[100]};
  `,
  primary: css`
    --button-color: ${({ theme }) => theme.colors.white};
    --button-bg-color: ${({ theme }) => theme.colors.primary};
  `,
  error: css`
    --button-color: ${({ theme }) => theme.colors.white};
    --button-bg-color: ${({ theme }) => theme.colors.error};
  `,
};

export type ButtonSize = keyof typeof ButtonSizeStyles;
export type ButtonVariant = keyof typeof ButtonVariantStyles;

interface BaseButtonProps {
  $fullWidth?: boolean;
  $rounded?: boolean;
  $size: ButtonSize;
  $variant: ButtonVariant;
  $css?: CSSProp;
}

export const BaseButton = styled.button<BaseButtonProps>`
  ${({ $size, $variant }) =>
    css`
      ${ButtonSizeStyles[$size]}
      ${ButtonVariantStyles[$variant]}
    `}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
 

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: var(--button-py) var(--button-px);
  border-radius: ${({ $rounded }) => ($rounded ? '9999px' : '0.25rem')};

  font-size: var(--button-text-size);
  font-weight: 700;

  color: var(--button-color);
  background-color: var(--button-bg-color);
  transition: opacity 0.15s ease-in;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.25;
  }
  ${({ $css }) => $css}
`;
