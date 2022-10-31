import styled from 'styled-components';
import ResizableTextArea from 'components/common/ResizableTextArea';
import NumberInput from 'components/common/NumberInput';
import Checkbox from 'components/common/Checkbox';

export const ArticleFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
`;

export const Field = styled.div`
  position: relative;
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;

export const TitleTextArea = styled(ResizableTextArea)`
  width: 100%;
  outline: none;
  padding: 1rem 0;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.grey[200]};
  background-color: transparent;
`;

export const CategoryInput = styled.input`
  width: 100%;
  padding: 1rem 0;
  outline: none;
  background-color: transparent;
`;

export const Won = styled.div`
  &::before {
    content: '₩';
  }
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.grey[900]};
  input:invalid + &::before {
    color: ${({ theme }) => theme.color.grey[400]};
  }
`;

export const PriceInput = styled(NumberInput)`
  width: 100%;
  padding: 1rem 0 1rem 1.5rem;
  outline: none;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.color.grey[200]};
  background-color: transparent;
`;

export const DiscountableCheckbox = styled(Checkbox)`
  padding: 1rem 0;
`;

export const ContentTextArea = styled(ResizableTextArea)`
  width: 100%;
  outline: none;
  background-color: transparent;
`;
