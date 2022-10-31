import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import ArticleForm from 'components/form/ArticleForm';
import AritcleFormLayout from 'layouts/ArticleFormLayout';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import LoadingFallback from 'components/boundary/LoadingFallback';
import useMutation from 'hooks/useMutation';
import { convertArticleSchema, requestEditArticle } from 'apis/article';
import useArticleQuery from 'hooks/useArticleQuery';
import ArticleRejectedFallback from 'components/boundary/ArticleRejectedFallback';
import { PAGE_URL } from 'constants/url.constant';
import { ArticleSchema, ARTICLE_SCHEMA } from 'constants/schema.constant';

export default function EditArticlePage() {
  const { id } = useParams();
  if (!id) {
    return <Navigate to={PAGE_URL.HOME} replace />;
  }

  return (
    <AsyncBoundary
      pendingFallback={<LoadingFallback />}
      rejectedFallback={<ArticleRejectedFallback />}
    >
      <EditArticleRenderPage />
    </AsyncBoundary>
  );
}

function EditArticleRenderPage() {
  const navigate = useNavigate();
  const { article, isMyArticle, refresh } = useArticleQuery();

  const { mutate } = useMutation(requestEditArticle(article.id), {
    onSuccess: async () => {
      refresh();
      navigate(PAGE_URL.ARTICLE_BY_ID(article.id), { replace: true });
    },
  });

  const methods = useForm<ArticleSchema>({
    mode: 'onSubmit',
    resolver: yupResolver(ARTICLE_SCHEMA),
    defaultValues: {
      title: article.title,
      content: article.content,
      isDiscountable: article.isDiscountable,
      price: article.price.toString(),
      categoryId: article.category.id,
      categoryName: article.category.name,
      images: [article.thumbnail, ...article.images],
    },
  });

  const onSubmit = async (articleSchema: ArticleSchema) => {
    const data = convertArticleSchema(articleSchema);
    await mutate(data);
  };

  const onClose = () => {
    navigate(-1);
  };

  if (!isMyArticle) {
    return <Navigate to={PAGE_URL.HOME} replace />;
  }

  return (
    <FormProvider {...methods}>
      <AritcleFormLayout onSubmit={onSubmit} onClose={onClose} title="판매글 수정">
        <ArticleForm />
      </AritcleFormLayout>
    </FormProvider>
  );
}
