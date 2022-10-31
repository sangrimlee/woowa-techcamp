import { Column, Entity, OneToMany } from 'typeorm';
import { IntIDEntity } from 'src/common/entities';
import { IsString, MaxLength } from 'class-validator';
import { Article } from './article.entity';

@Entity()
export class Category extends IntIDEntity {
  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  @IsString()
  @MaxLength(64)
  name: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @IsString()
  imgUrl: string;
}
