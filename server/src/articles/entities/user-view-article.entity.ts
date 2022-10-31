import { Entity, ManyToOne } from 'typeorm';
import { IntIDEntity } from 'src/common/entities';
import { User } from 'src/users/entities';
import { Article } from './article.entity';

@Entity()
export class UserViewArticle extends IntIDEntity {
  @ManyToOne(() => User, (user) => user.viewArticles)
  user: User;

  @ManyToOne(() => Article, (article) => article.viewUsers)
  article: Article;
}
