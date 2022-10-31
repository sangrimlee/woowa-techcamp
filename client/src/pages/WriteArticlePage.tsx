import React from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import ArticleForm from 'components/form/ArticleForm';
import AritcleFormLayout from 'layouts/ArticleFormLayout';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import LoadingFallback from 'components/boundary/LoadingFallback';
import useMutation from 'hooks/useMutation';
import { userRegion } from 'recoil/atoms/region.atom';
import { convertArticleSchema, requestCreateArticle } from 'apis/article';
import { PAGE_URL } from 'constants/url.constant';
import { ArticleSchema, ARTICLE_SCHEMA } from 'constants/schema.constant';

export default function WriteArticlePage() {
  return (
    <AsyncBoundary pendingFallback={<LoadingFallback />}>
      <WritleArticleRenderedPage />
    </AsyncBoundary>
  );
}

function WritleArticleRenderedPage() {
  const navigate = useNavigate();
  const { selectedRegion } = useRecoilValue(userRegion);
  const { mutate } = useMutation(requestCreateArticle, {
    onSuccess: (data) => {
      navigate(PAGE_URL.ARTICLE_BY_ID(data.id), { replace: true });
    },
  });
  const methods = useForm<ArticleSchema>({
    mode: 'onSubmit',
    resolver: yupResolver(ARTICLE_SCHEMA),
    defaultValues: {
      title: '',
      content: '',
      isDiscountable: false,
      images: [],
    },
  });

  const onSubmit = async (articleSchema: ArticleSchema) => {
    const data = convertArticleSchema(articleSchema, selectedRegion ?? 0);
    await mutate(data);
  };

  const onClose = () => {
    navigate(PAGE_URL.HOME);
  };

  return (
    <FormProvider {...methods}>
      <AritcleFormLayout onSubmit={onSubmit} onClose={onClose} title="판매글 등록">
        <ArticleForm />
      </AritcleFormLayout>
    </FormProvider>
  );
}
