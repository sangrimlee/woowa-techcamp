import React, { forwardRef, useId } from 'react';
import Icon from '../Icon';
import * as Styled from './Checkbox.styled';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'hidden' | 'type' | 'id'> {
  children?: React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, ...props }, ref) => {
    const id = useId();

    return (
      <Styled.CheckboxLabel htmlFor={id} className={className}>
        <input id={id} type="checkbox" hidden {...props} ref={ref} />
        <Icon icon="CheckIcon" size={20} />
        <span>{children}</span>
      </Styled.CheckboxLabel>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
