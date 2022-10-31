import React from 'react';
import Icon from '../Icon';
import {
  BaseNumberInput,
  NumberInputButton,
  NumberInputSize,
  NumberInputValue,
} from './NumberInput.styled';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  size?: NumberInputSize;
}

export default function NumberInput({
  value,
  onChange,
  minValue = 1,
  maxValue = 10,
  size = 'lg',
}: NumberInputProps) {
  const handleSubstract = () => {
    onChange(value - 1);
  };

  const handleAdd = () => {
    onChange(value + 1);
  };

  return (
    <BaseNumberInput $size={size}>
      <NumberInputButton onClick={handleSubstract} disabled={minValue >= value}>
        <Icon icon="MinusIcon" />
      </NumberInputButton>
      <NumberInputValue>{value}</NumberInputValue>
      <NumberInputButton onClick={handleAdd} disabled={maxValue <= value}>
        <Icon icon="PlusIcon" />
      </NumberInputButton>
    </BaseNumberInput>
  );
}
