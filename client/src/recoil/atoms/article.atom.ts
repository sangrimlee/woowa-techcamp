import { atomFamily } from 'recoil';
import { Article } from 'types/article';
import { currentArticleQuery } from 'recoil/selectors/article.selector';

export const currentArticleState = atomFamily<Article, string | number>({
  key: 'CurrentArticleState',
  default: currentArticleQuery,
});
