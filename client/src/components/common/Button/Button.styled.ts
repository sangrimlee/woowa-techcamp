import styled, { css, CSSProp } from 'styled-components';

const ButtonSizeStyles = {
  md: css`
    --button-text-size: 0.875rem;
    --button-py: 0.5rem;
    --button-px: 1rem;
    --button-min-h: 2.375rem;
  `,
  lg: css`
    --button-text-size: 1rem;
    --button-py: 0.75rem;
    --button-px: 1.25rem;
    --button-min-h: 3rem;
  `,
  xl: css`
    --button-text-size: 1.125rem;
    --button-py: 0.875rem;
    --button-px: 2rem;
    --button-min-h: 3.5rem;
  `,
};

const ButtonVariantStyles = {
  primary: css`
    --button-color: ${({ theme }) => theme.color.white};
    --button-bg-color: ${({ theme }) => theme.color.primary};
  `,
  github: css`
    --button-color: ${({ theme }) => theme.color.white};
    --button-bg-color: #333333;
  `,
  default: css`
    --button-color: ${({ theme }) => theme.color.grey[700]};
    --button-bg-color: ${({ theme }) => theme.color.grey[150]};
  `,
};

export type ButtonSize = keyof typeof ButtonSizeStyles;
export type ButtonVariant = keyof typeof ButtonVariantStyles;

interface StyledButtonProps {
  withIcon?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
  css?: CSSProp;
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ size, variant }) =>
    css`
      ${ButtonSizeStyles[size]}
      ${ButtonVariantStyles[variant]}
    `}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  ${({ withIcon }) =>
    withIcon &&
    css`
      position: relative;
      svg {
        position: absolute;
        left: 1.5rem;
      }
    `}

  min-height: var(--button-min-h);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-py) var(--button-px);
  border-radius: ${({ rounded }) => (rounded ? '9999px' : '0.5rem')};
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

  ${({ css }) => css}
`;
