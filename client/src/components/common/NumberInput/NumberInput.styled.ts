import styled, { css } from 'styled-components';

export const numberInputSizeStyle = {
  md: css`
    --number-input-font-size: 0.875rem;
    --number-input-padding: 0.25rem;
    --number-input-icon-size: 1rem;
    --number-input-gap: 0.5rem;
  `,
  lg: css`
    --number-input-font-size: 1.125rem;
    --number-input-padding: 0.375rem;
    --number-input-icon-size: 1.25rem;
    --number-input-gap: 0.75rem;
  `,
};

export type NumberInputSize = keyof typeof numberInputSizeStyle;

interface BaseNumberInputProps {
  $size: NumberInputSize;
}

export const BaseNumberInput = styled.div<BaseNumberInputProps>`
  ${({ $size }) => numberInputSizeStyle[$size]}
  display: flex;
  align-items: center;
  column-gap: var(--number-input-gap);
`;

export const NumberInputValue = styled.span`
  font-size: var(--number-input-font-size);
`;

export const NumberInputButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--number-input-padding);
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.gray[500]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  & > svg {
    width: var(--number-input-icon-size);
    height: var(--number-input-icon-size);
  }
`;
