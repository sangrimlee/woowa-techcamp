import { ChangeEvent, FormEvent, useState } from 'react';

type FormValidation = {
  pattern: RegExp;
  message: string;
};

type FormError<T> = Partial<Record<keyof T, string>>;

interface UseFormProps<T> {
  initialValues?: Partial<T>;
  validations?: Partial<Record<keyof T, FormValidation | undefined>>;
}

export default function useForm<T>({ initialValues, validations }: UseFormProps<T> = {}) {
  const [data, setData] = useState<T>(initialValues as T);
  const [errors, setErrors] = useState<FormError<T>>({});

  const validate = (key: keyof T, value: string) => {
    if (!validations) return;
    const validation = validations[key];
    if (validation) {
      const isValid = validation.pattern.test(value);
      setErrors({
        ...errors,
        [key]: !isValid ? validation.message : '',
      });
    }
  };

  const handleChange =
    <S>(key: keyof T, sanitize?: (value: string) => S) =>
    ({ target }: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitize ? sanitize(target.value) : target.value;
      setData({
        ...data,
        [key]: value,
      });
      validate(key, target.value);
    };

  const handleSubmit =
    (onSubmit: (data: T) => void | Promise<void>) => async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSubmit(data);
    };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
  };
}
