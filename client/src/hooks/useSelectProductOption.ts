import { useMemo, useState } from 'react';
import { Product, ProductOption, ProductOptionChoice } from 'types';

export interface SelectedOption extends Omit<ProductOption, 'choices'> {
  choice: ProductOptionChoice;
}

export default function useSelectedOptions(product: Product) {
  const initialSelectedOptions: SelectedOption[] = product.productOptions
    .filter((option) => option.optionType === 'Radio')
    .map(({ choices, ...option }) => ({
      ...option,
      choice: choices[0],
    }));

  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(initialSelectedOptions);

  const onChangeRadioOption = (option: SelectedOption) => {
    const filteredSelectedOptions = selectedOptions.filter(({ id }) => id !== option.id);
    setSelectedOptions([...filteredSelectedOptions, option]);
  };

  const onChangeCheckboxOption = (checked: boolean, option: SelectedOption) => {
    if (!checked) {
      setSelectedOptions(
        selectedOptions.filter(
          ({ id, choice: { name } }) => id !== option.id || name !== option.choice.name,
        ),
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const totalOptionPrice = useMemo(
    () => selectedOptions.reduce((prev, { choice: { price } }) => prev + price, 0),
    [selectedOptions],
  );

  return {
    selectedOptions,
    totalOptionPrice,
    onChangeRadioOption,
    onChangeCheckboxOption,
  };
}
