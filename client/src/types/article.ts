import { Category } from './category';
import { Region, User } from './user';

export enum ArticleStatus {
  Sale = 'Sale', // 판매중
  Sold = 'Sold', // 판매완료
  Reserved = 'Reserved', // 예약중
}

export interface Article {
  id: 1;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  price: number;
  isDiscountable: boolean;
  status: ArticleStatus;
  viewCount: number;
  thumbnail: string;
  images: string[];
  region: Region;
  seller: User;
  category: Category;
  likeCount: number;
  isLike: boolean;
  chatCount: number;
}
