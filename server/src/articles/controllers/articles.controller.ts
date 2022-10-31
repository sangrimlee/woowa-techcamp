import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators';
import { AuthGuard } from 'src/auth/guards';
import { User } from 'src/users/entities';
import {
  CreateArticleDto,
  GetArticlesDto,
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from '../dtos';
import { ArticlesService } from '../providers';

@ApiTags('Article 관련 API')
@UseGuards(AuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ description: 'Article 페이지네이션 API' })
  @Get('/')
  async getArticles(@Query() getArticlesDto: GetArticlesDto) {
    const articles = await this.articlesService.getArticles(getArticlesDto);
    return articles;
  }

  @ApiOperation({ description: 'Article 생성 API' })
  @Post('/')
  async createArticle(@AuthUser() user: User, @Body() createArticleDto: CreateArticleDto) {
    const newArticle = await this.articlesService.createArticle(user, createArticleDto);
    return newArticle;
  }

  @ApiOperation({ description: 'Article 가져오기 API' })
  @Get('/:id')
  async getArticle(@AuthUser() user: User, @Param('id') articleId: number) {
    const article = await this.articlesService.getArticle(user.id, articleId);
    return article;
  }

  @ApiOperation({ description: 'Article 수정 API' })
  @Patch('/:id')
  async updateArticle(
    @AuthUser() user: User,
    @Param('id') articleId: number,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    await this.articlesService.updateArticle(user.id, articleId, updateArticleDto);
  }

  @ApiOperation({ description: 'Article 삭제 API' })
  @Delete('/:id')
  async deleteArticle(@AuthUser() user: User, @Param('id') articleId: number) {
    await this.articlesService.deleteArticle(user.id, articleId);
  }

  @ApiOperation({ description: 'Article 상태 수정 API' })
  @Patch('/:id/status')
  async updateArticleStatus(
    @AuthUser() user: User,
    @Param('id') articleId: number,
    @Body() updateArticleStatusDto: UpdateArticleStatusDto
  ) {
    await this.articlesService.updateArticleStatus(user.id, articleId, updateArticleStatusDto);
  }

  @ApiOperation({ description: 'Article 좋아요 API' })
  @Post('/:id/like')
  async likeArticles(@AuthUser() user: User, @Param('id') articleId: number) {
    await this.articlesService.likeArticle(user, articleId);
    return {
      status: true,
    };
  }

  @ApiOperation({ description: 'Article 좋아요 취소 API' })
  @Post('/:id/dislike')
  async dislikeArticle(@AuthUser() user: User, @Param('id') articleId: number) {
    await this.articlesService.dislikeArticle(user, articleId);
    return {
      status: true,
    };
  }

  @ApiOperation({ description: 'Article 채팅 목록 가져오기' })
  @Get('/:id/chats')
  async getChatsByArticle(@AuthUser() user: User, @Param('id') articleId: number) {
    const chats = await this.articlesService.getChatsByArticle(user.id, articleId);
    return chats;
  }
}
