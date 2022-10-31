import { Column, Entity, ManyToOne } from 'typeorm';
import { IntIDEntity } from 'src/common/entities';
import { Chat } from './chat.entity';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
export class Message extends IntIDEntity {
  @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.sendMessages, { nullable: false })
  sender: User;

  @Column({
    type: 'text',
  })
  @IsString()
  content: string;
}
