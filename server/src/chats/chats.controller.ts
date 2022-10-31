import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService, MessagesService } from './providers';
import { AuthGuard } from 'src/auth/guards';
import { AuthUser } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { CreateChatDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagintaionDto } from 'src/common/dtos';

@ApiTags('채팅 관련 API')
@UseGuards(AuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService
  ) {}

  @ApiOperation({ description: '새로운 채팅방 생성 또는 기존 채팅방 조회' })
  @Post('/')
  async createChat(@AuthUser() user: User, @Body() { articleId }: CreateChatDto) {
    const chatId = await this.chatsService.createChat(user.id, articleId);
    return {
      chatId,
    };
  }

  @ApiOperation({ description: '기존 채팅방 삭제' })
  @Delete('/:id')
  async deleteChat(@AuthUser() user: User, @Param('id') chatId: string) {
    await this.chatsService.deleteChat(user.id, chatId);
    return {
      status: true,
    };
  }

  @ApiOperation({ description: '채팅방 조회 기능' })
  @Get('/:id')
  async findChatById(@Param('id') chatId: string) {
    const chat = await this.chatsService.findByIdOrFail(chatId, { article: { seller: true } });
    return chat;
  }

  @ApiOperation({ description: '채팅방 메시지 조회' })
  @Get('/:id/messages')
  async findMessagesByChat(
    @AuthUser() user: User,
    @Param('id') chatId: string,
    @Body() pagination: PagintaionDto
  ) {
    await this.messagesService.checkUserCanSendMessage(chatId, user.id);
    const results = await this.messagesService.findMessagesByChat(chatId, pagination);
    return results;
  }
}
