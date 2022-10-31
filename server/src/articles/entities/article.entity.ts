import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { IntIDEntity } from 'src/common/entities';
import { ArticleStatus } from '../enums';
import { User } from 'src/users/entities';
import { Category } from './category.entity';
import { Region } from 'src/regions/entities';
import { UserViewArticle } from './user-view-article.entity';
import { Chat } from 'src/chats/entities';

@Entity()
export class Article extends IntIDEntity {
  @ApiProperty({ description: '제목' })
  @Column({
    type: 'varchar',
    length: 256,
  })
  @IsString()
  @MaxLength(256)
  title: string;

  @ApiProperty({ description: '본문 내용' })
  @Column({
    type: 'text',
  })
  @IsString()
  content: string;

  @ApiProperty({ description: '판매 가격' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @Max(10 ** 10 - 1)
  price: number;

  @ApiProperty({ description: '네고 가능 여부' })
  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  isDiscountable: boolean;

  @ApiProperty({ description: '판매 상태 (판매중, 판매완료, 예약중)', enum: ArticleStatus })
  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.Sale,
  })
  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @ApiProperty({ description: '조회수' })
  @Column({
    type: 'int',
    default: 0,
  })
  viewCount: number;

  @ApiProperty({ description: '썸네일' })
  @Column({
    type: 'varchar',
    length: 256,
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({ description: '썸네일외 추가적인 이미지' })
  @Column({
    type: 'json',
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.articles, { nullable: false, eager: true })
  seller: User;

  @ManyToOne(() => Category, (category) => category.articles, { nullable: false, eager: true })
  category: Category;

  @ManyToMany(() => User, (user) => user.likeArticles)
  likeUsers: User[];

  @ManyToOne(() => Region, (region) => region.articles, { nullable: false })
  region: Region;

  @OneToMany(() => UserViewArticle, (userViewArticle) => userViewArticle.article)
  viewUsers: UserViewArticle[];

  @OneToMany(() => Chat, (chat) => chat.article)
  chats: Chat[];
}
