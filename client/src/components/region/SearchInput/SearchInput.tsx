import React from 'react';
import * as Styled from './SearchInput.styled';
import Icon from 'components/common/Icon';
import { useDebounce } from 'hooks/useDebounce';

interface SearchInputProps {
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ onChangeKeyword }: SearchInputProps) {
  const debounce = useDebounce();
  const dbouncedOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      onChangeKeyword(e);
    }, 350);
  };

  return (
    <Styled.InputWrapper>
      <Icon icon="SearchIcon" size={24} />
      <Styled.SearchInput
        placeholder="동명(읍, 면, 동)으로 검색(ex. 서초동)"
        onChange={dbouncedOnChange}
      />
    </Styled.InputWrapper>
  );
}
