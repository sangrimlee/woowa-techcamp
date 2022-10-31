import React, { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';
import useComposedRef from 'hooks/useComposedRef';
import { convertStringToNumber } from 'utils/input.util';

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'pattern' | 'formNoValidate'> {
  maxValue?: number;
  minValue?: number;
  convertLocaleString?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { maxValue = Infinity, minValue = -Infinity, convertLocaleString = true, onChange, ...props },
    userRef
  ) => {
    const libRef = useRef<HTMLInputElement | null>(null);
    const ref = useComposedRef(libRef, userRef);

    const checkMaxAndMinValue = useCallback(
      (value: number) => {
        return Math.max(Math.min(value, maxValue), minValue);
      },
      [maxValue, minValue]
    );

    const convertTargetValue = useCallback(
      (targetValue: string) => {
        if (!libRef.current) return;
        if (targetValue === '') {
          return;
        }
        const convertedValue = checkMaxAndMinValue(convertStringToNumber(targetValue));
        libRef.current.value = convertLocaleString
          ? convertedValue.toLocaleString()
          : convertedValue.toString();
      },
      [checkMaxAndMinValue, convertLocaleString]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      convertTargetValue(event.target.value);
      onChange && onChange(event);
    };

    useLayoutEffect(() => {
      if (libRef.current) {
        convertTargetValue(libRef.current.value);
      }
    }, [convertTargetValue]);

    return <input type="text" onChange={handleChange} formNoValidate={true} {...props} ref={ref} />;
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
