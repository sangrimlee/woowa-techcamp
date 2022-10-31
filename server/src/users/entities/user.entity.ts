import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UUIDEntity } from 'src/common/entities';
import { Article, UserViewArticle } from 'src/articles/entities';
import { Region } from 'src/regions/entities';
import { ProviderEnum } from 'src/users/enums';
import { Chat, Message } from 'src/chats/entities';

@Entity()
export class User extends UUIDEntity {
  @ApiProperty({
    description: '사용자 닉네임',
  })
  @Column({
    length: 48,
  })
  @IsString()
  @Length(2, 48)
  username: string;

  @ApiProperty({
    description: '사용자 이메일',
  })
  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @OneToMany(() => Article, (article) => article.seller)
  articles: Article[];

  @ManyToMany(() => Article, (article) => article.likeUsers)
  @JoinTable({
    name: 'user_like_article',
  })
  likeArticles: Article[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  @ManyToMany(() => Region)
  @JoinTable({
    name: 'user_has_region',
  })
  regions: Region[];

  @ApiProperty({
    description: '소셜 사용자 아이디',
  })
  @Column({ nullable: true })
  @IsString()
  providerUserId: string;

  @ApiProperty({
    description: '소셜 종류',
  })
  @Column()
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;

  @OneToMany(() => UserViewArticle, (userViewArticle) => userViewArticle.user)
  viewArticles: UserViewArticle[];

  @OneToMany(() => Chat, (chat) => chat.buyer)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.sender)
  sendMessages: Message[];
}
