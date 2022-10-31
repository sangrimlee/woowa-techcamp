import { ArticleStatus } from 'types/article';

export const ARTICLE_STATUS: Record<ArticleStatus, string> = {
  [ArticleStatus.Sale]: '판매중',
  [ArticleStatus.Reserved]: '예약중',
  [ArticleStatus.Sold]: '판매완료',
} as const;
