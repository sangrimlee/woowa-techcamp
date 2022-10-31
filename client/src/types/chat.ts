import { Article } from './article';
import { User } from './user';

export interface Chat {
  id: string;
  lastMessage: string | null;
  article: Article;
  buyer: User;
  updatedAt: string;
  createdAt: string;
}
