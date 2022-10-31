import React from 'react';
import * as Styled from './RadioInput.styled';

interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export default function RadioInput({
  id,
  children,
  type = 'radio',
  hidden = true,
  ...inputProps
}: RadioInputProps) {
  return (
    <div>
      <input id={id} type={type} hidden={hidden} {...inputProps} />
      <Styled.Label htmlFor={id}>{children}</Styled.Label>
    </div>
  );
}
