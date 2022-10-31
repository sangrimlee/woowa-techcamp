import { selectorFamily } from 'recoil';
import { requestGetArticle } from 'apis/article';
import { Article } from 'types/article';

export const currentArticleQuery = selectorFamily<Article, string | number>({
  key: 'CurrentArticleQuery',
  get: (articleId: string | number) => async () => {
    const article = await requestGetArticle(articleId);
    return article;
  },
});
