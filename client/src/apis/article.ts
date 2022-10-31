import { mutation, query } from 'utils/api.util';
import { API_URL } from 'constants/url.constant';
import { Article, ArticleStatus } from 'types/article';
import { ArticleSchema } from 'constants/schema.constant';
import { convertStringToNumber } from 'utils/input.util';

export async function requestGetArticle(articleId: number | string) {
  const data = await query<Article>(API_URL.GET_ARTICLE_BY_ID(articleId));
  return data;
}

export async function requestLikeorDislikeArticle({
  articleId,
  isLike,
}: {
  articleId: string | number;
  isLike: boolean;
}) {
  const url = isLike ? API_URL.LIKE_ARTICLE(articleId) : API_URL.DISLIKE_ARTICLE(articleId);
  await mutation({
    url,
    method: 'POST',
  });
}

export const requestChangeArticleStatus =
  (articleId: string | number) => async (status: ArticleStatus) => {
    const url = API_URL.CHANGE_ARITLCE_STATUS(articleId);
    await mutation({
      url,
      method: 'PATCH',
      data: {
        status,
      },
    });
  };

interface ArticleRequestData {
  title: string;
  content: string;
  price: number;
  isDiscountable: boolean;
  thumbnail: string;
  images: string[];
  categoryId: number;
  regionId?: number;
}

export function convertArticleSchema(
  articleSchema: ArticleSchema,
  regionId?: number
): ArticleRequestData {
  const price = convertStringToNumber(articleSchema.price ?? '');
  const [thumbnail, ...images] = articleSchema.images;

  return {
    title: articleSchema.title,
    content: articleSchema.content,
    isDiscountable: articleSchema.isDiscountable,
    price,
    thumbnail,
    images,
    categoryId: articleSchema.categoryId,
    regionId,
  };
}

export async function requestCreateArticle(data: ArticleRequestData) {
  const article = await mutation<ArticleRequestData, Article>({
    url: API_URL.CREATE_ARTICLE,
    method: 'POST',
    data,
  });
  return article;
}

export const requestEditArticle =
  (articleId: string | number) => async (data: ArticleRequestData) => {
    await mutation<ArticleRequestData>({
      url: API_URL.EDIT_ARTICLE(articleId),
      method: 'PATCH',
      data,
    });
  };

export const requestDeletArticle = async (articleId: string | number) => {
  await mutation({
    url: API_URL.DELETE_ARTICLE(articleId),
    method: 'DELETE',
  });
};
