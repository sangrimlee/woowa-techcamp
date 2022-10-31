import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagintaionDto } from 'src/common/dtos';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { Repository } from 'typeorm';
import { Message } from '../entities';
import { ChatsService } from './chats.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatsService: ChatsService
  ) {}

  async findMessagesByChat(chatId: string, { page, per }: PagintaionDto) {
    const results = await this.messageRepository.findAndCount({
      where: {
        chat: {
          id: chatId,
        },
      },
      relations: {
        chat: true,
        sender: true,
      },
      skip: (page - 1) * per,
      take: per,
    });
    return results;
  }

  async checkUserCanSendMessage(chatId: string, senderId: string) {
    const chat = await this.chatsService.findByIdOrFail(chatId);
    const userCanSendMessage = [chat.buyer.id, chat.article.seller.id].includes(senderId);
    if (!userCanSendMessage) {
      throw new CustomException(HttpStatus.FORBIDDEN, ErrorCode.CH003);
    }
    return chat;
  }

  async createMessage(chatId: string, senderId: string, content: string) {
    const chat = await this.checkUserCanSendMessage(chatId, senderId);
    const newMessage = await this.messageRepository.save(
      this.messageRepository.create({ content, chat, sender: { id: senderId } })
    );
    await this.chatsService.setLastMessage(chatId, content);
    return newMessage;
  }
}
