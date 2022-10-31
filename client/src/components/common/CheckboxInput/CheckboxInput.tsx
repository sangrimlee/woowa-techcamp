import React from 'react';
import Icon from '../Icon';
import * as Styled from './CheckboxInput.styled';

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export default function CheckboxInput({
  id,
  children,
  type = 'checkbox',
  hidden = true,
  ...inputProps
}: CheckboxInputProps) {
  return (
    <div>
      <input id={id} type={type} hidden={hidden} {...inputProps} />
      <Styled.Label htmlFor={id}>
        <Styled.Checkbox>
          <Icon icon="CheckIcon" size="20" />
        </Styled.Checkbox>
        <span>{children}</span>
      </Styled.Label>
    </div>
  );
}
