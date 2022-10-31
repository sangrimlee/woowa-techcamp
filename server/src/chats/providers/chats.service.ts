import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { ArticlesService } from 'src/articles/providers';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { Chat } from '../entities';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly ariclesService: ArticlesService
  ) {}

  async findByIdOrFail(chatId: string, relations?: FindOptionsRelations<Chat>) {
    const chat = await this.chatRepository.findOne({ where: { id: chatId }, relations });
    if (!chat) {
      throw new CustomException(HttpStatus.NOT_FOUND, ErrorCode.CH002);
    }
    return chat;
  }

  async findOrCreate(buyerId: string, articleId: number) {
    let chat = await this.chatRepository.findOneBy({
      article: {
        id: articleId,
      },
      buyer: {
        id: buyerId,
      },
    });
    if (!chat) {
      chat = await this.chatRepository.save(
        this.chatRepository.create({
          article: {
            id: articleId,
          },
          buyer: {
            id: buyerId,
          },
        })
      );
    }
    return chat;
  }

  async createChat(buyerId: string, articleId: number) {
    const article = await this.ariclesService.findByIdOrFail(articleId);
    if (buyerId === article.seller.id) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.CH001);
    }
    const chat = await this.findOrCreate(buyerId, articleId);
    return chat.id;
  }

  async deleteChat(userId: string, chatId: string) {
    const chat = await this.findByIdOrFail(chatId);
    const chatUsers = [chat.buyer.id, chat.article.seller.id];
    if (!chatUsers.includes(userId)) {
      throw new CustomException(HttpStatus.FORBIDDEN, ErrorCode.CH003);
    }
    await this.chatRepository.softDelete(chatId);
  }

  async setLastMessage(chatId: string, content: string) {
    await this.chatRepository.update(chatId, { lastMessage: content });
  }
}
