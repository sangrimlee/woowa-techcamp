import React, { useState } from 'react';
import Modal from '../Modal';
import Button from 'components/common/Button';
import NumberInput from 'components/common/NumberInput';
import { useCartContext } from 'contexts/CartContext';
import useSelectedOptions, { SelectedOption } from 'hooks/useSelectProductOption';
import { Product, ProductOption } from 'types';
import * as Styled from './ProductOptionModal.styled';
import RadioInput from 'components/common/RadioInput';
import CheckboxInput from 'components/common/CheckboxInput';

interface ProductOptionModalProps {
  open: boolean;
  onClose?: () => void;
  product: Product;
}

export default function ProductOptionModal({ open, onClose, product }: ProductOptionModalProps) {
  const { addCartProduct } = useCartContext(`ProductOptionModal-${product.name}`);
  const [orderCount, setOrderCount] = useState<number>(1);
  const { selectedOptions, onChangeRadioOption, onChangeCheckboxOption, totalOptionPrice } =
    useSelectedOptions(product);

  const onConfirm = () => {
    addCartProduct({
      product,
      orderCount,
      totalOptionPrice,
      selectedOptions,
    });
    onClose && onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Title>옵션 선택하기</Modal.Title>
      <Styled.ProductContainer>
        <Styled.ProductThumbnail>
          <img src={product.thumbnail} alt={product.name} />
        </Styled.ProductThumbnail>
        <Styled.ProductContent>
          <h2>{product.name}</h2>
          <strong>{((product.price + totalOptionPrice) * orderCount).toLocaleString()}원</strong>
          <Styled.ProductOptionName>상품 개수</Styled.ProductOptionName>
          <NumberInput value={orderCount} onChange={setOrderCount} />
        </Styled.ProductContent>
      </Styled.ProductContainer>
      <Modal.Subtitle>추가 옵션</Modal.Subtitle>
      <Styled.OptionListContainer>
        {product.productOptions.map((productOption) => {
          if (productOption.optionType === 'Radio') {
            return (
              <ProductOptionRadio
                key={productOption.id}
                productOption={productOption}
                onChange={onChangeRadioOption}
              />
            );
          }
          return (
            <ProductOptionCheckbox
              key={productOption.id}
              productOption={productOption}
              onChange={onChangeCheckboxOption}
            />
          );
        })}
      </Styled.OptionListContainer>
      <Styled.ButtonContainer>
        <Button variant="default" onClick={onClose}>
          취소하기
        </Button>
        <Button onClick={onConfirm}>장바구니 추가</Button>
      </Styled.ButtonContainer>
    </Modal>
  );
}

interface ProductOptionRadioProps {
  productOption: ProductOption;
  onChange: (selectedOption: SelectedOption) => void;
}

function ProductOptionRadio({ productOption, onChange }: ProductOptionRadioProps) {
  const { choices, ...option } = productOption;

  return (
    <div>
      <Styled.ProductOptionName>{option.name}</Styled.ProductOptionName>
      <Styled.RadioOptionsContainer>
        {choices.map((choice, index) => (
          <li key={option.id + choice.name}>
            <RadioInput
              type="radio"
              id={option.id + choice.name}
              name={option.id}
              value={choice.name}
              onChange={() => onChange({ ...option, choice })}
              defaultChecked={index === 0}
            >
              {choice.name} {0 < choice.price && `(+${choice.price.toLocaleString()}원)`}
            </RadioInput>
          </li>
        ))}
      </Styled.RadioOptionsContainer>
    </div>
  );
}

interface ProductOptionCheckboxProps {
  productOption: ProductOption;
  onChange: (checked: boolean, selectedOption: SelectedOption) => void;
}

function ProductOptionCheckbox({ productOption, onChange }: ProductOptionCheckboxProps) {
  const { choices, ...option } = productOption;

  return (
    <div>
      <Styled.ProductOptionName>{option.name}</Styled.ProductOptionName>
      <Styled.CheckboxOptionsContainer>
        {choices.map((choice) => (
          <li key={option.id + choice.name}>
            <CheckboxInput
              id={option.id + choice.name}
              name={option.id}
              value={choice.name}
              onChange={({ target: { checked } }) => onChange(checked, { ...option, choice })}
              defaultChecked={false}
            >
              {choice.name} {0 < choice.price && `(+${choice.price.toLocaleString()}원)`}
            </CheckboxInput>
          </li>
        ))}
      </Styled.CheckboxOptionsContainer>
    </div>
  );
}
