import React from 'react';
import { useFormContext } from 'react-hook-form';
import ArticleImageUploader from './ArticleImageUploader';
import ArticleCategorySelector from './ArticleCategorySelector';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import ArticleCategoryPendingFallback from 'components/boundary/ArticleCategoryPendingFallback';
import { ArticleSchema } from 'constants/schema.constant';
import {
  Field,
  ArticleFormWrapper,
  CategoryInput,
  Won,
  PriceInput,
  TitleTextArea,
  ContentTextArea,
  DiscountableCheckbox,
} from './ArticleForm.styled';

export default function ArticleForm() {
  const { register } = useFormContext<ArticleSchema>();

  return (
    <ArticleFormWrapper>
      <ArticleImageUploader />
      <Field>
        <TitleTextArea
          rows={1}
          tabIndex={0}
          autoComplete="off"
          placeholder="글 제목"
          preventEnterNewLine
          {...register('title')}
        />
      </Field>
      <Field>
        <CategoryInput
          tabIndex={-1}
          readOnly
          placeholder="(필수) 카테고리를 선택해주세요."
          required
          {...register('categoryName')}
        />
      </Field>
      <AsyncBoundary pendingFallback={<ArticleCategoryPendingFallback />}>
        <ArticleCategorySelector />
      </AsyncBoundary>
      <Field>
        <PriceInput
          minValue={0}
          maxValue={999999999}
          tabIndex={1}
          placeholder="가격 (선택사항)"
          required
          {...register('price')}
        />
        <Won />
      </Field>
      <Field>
        <DiscountableCheckbox tabIndex={2} {...register('isDiscountable')}>
          가격 제안받기
        </DiscountableCheckbox>
      </Field>
      <Field>
        <ContentTextArea
          tabIndex={3}
          autoComplete="off"
          placeholder="올릴 게시글 내용을 작성해주세요. (가품 및 판매 금지 품목은 게시가 제한될 수 있어요.)"
          {...register('content')}
        />
      </Field>
    </ArticleFormWrapper>
  );
}
