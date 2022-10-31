import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message } from './entities';
import { ChatsController } from './chats.controller';
import { ChatsService, MessagesService } from './providers';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), ArticlesModule],
  providers: [ChatsService, MessagesService],
  controllers: [ChatsController],
})
export class ChatsModule {}
