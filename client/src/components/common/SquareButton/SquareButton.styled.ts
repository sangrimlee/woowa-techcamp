import styled, { css } from 'styled-components';

const SquareButtonSizeStyles = {
  lg: css`
    --square-button-size: 10rem;
    --square-button-rounded: 0.25rem;
  `,
  md: css`
    --square-button-size: 8rem;
    --square-button-rounded: 0.25rem;
  `,
};

const SquareButtonVariantStyles = {
  primary: css`
    --square-button-color: ${({ theme }) => theme.colors.white};
    --square-button-bg-color: ${({ theme }) => theme.colors.primary};
  `,
  default: css`
    --square-button-color: ${({ theme }) => theme.colors.gray[700]};
    --square-button-bg-color: ${({ theme }) => theme.colors.gray[100]};
  `,
};

export type SquareButtonSize = keyof typeof SquareButtonSizeStyles;
export type SquareButtonVariant = keyof typeof SquareButtonVariantStyles;

interface BaseSquareButtonProps {
  $size: SquareButtonSize;
  $variant: SquareButtonVariant;
}

export const BaseSquareButton = styled.button<BaseSquareButtonProps>`
  ${({ $size, $variant }) =>
    css`
      ${SquareButtonSizeStyles[$size]}
      ${SquareButtonVariantStyles[$variant]}
    `}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: var(--square-button-size);
  height: var(--square-button-size);
  border-radius: var(--square-button-rounded);
  color: var(--square-button-color);
  background-color: var(--square-button-bg-color);
  transition: opacity 0.15s ease-in;
  font-size: 1.125rem;
  font-weight: 700;
  row-gap: 0.75rem;

  &:hover {
    opacity: 0.75;
  }
`;
