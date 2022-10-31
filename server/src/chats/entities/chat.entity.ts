import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UUIDEntity } from 'src/common/entities';
import { User } from 'src/users/entities';
import { Article } from 'src/articles/entities';
import { Message } from './message.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Chat extends UUIDEntity {
  @ManyToOne(() => User, (user) => user.chats, { eager: true, nullable: false })
  buyer: User;

  @ManyToOne(() => Article, (article) => article.chats, { eager: true, nullable: false })
  article: Article;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ApiProperty({ description: '채팅방 마지막 메시지' })
  @Column({
    type: 'text',
    nullable: true,
  })
  @IsString()
  lastMessage?: string;
}
