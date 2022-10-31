import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ACCESS_TOKEN_COOKIE_KEY } from 'src/auth/constants';
import { AuthUser } from 'src/auth/decorators';
import { AuthGuard } from 'src/auth/guards';
import { ExceptionResponse } from 'src/common/exceptions/responses';
import { CreateUserDto } from './dtos';
import { User } from './entities';
import { IsAvailableResponse } from './responses';
import { UserResponse } from './responses/user.respones';
import { UsersService } from './users.service';

@ApiTags('사용자 관련 API')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ description: '회원가입 API' })
  @ApiBadRequestResponse({
    type: ExceptionResponse,
    description: '이미 사용중인 이메일을 요청한 경우',
  })
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res) {
    const newUser = await this.usersService.createUser(createUserDto);
    const { accessToken, accessTokenCookieOption } = await this.authService.createAccessToken(
      newUser.id
    );
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, accessTokenCookieOption);
  }

  @ApiOperation({ description: '이메일 사용 가능 여부 API' })
  @ApiOkResponse({ type: IsAvailableResponse })
  @Get('/available/email')
  async isEmailAvailable(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return {
      isAvailable: !user,
    };
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ description: '사용자 정보 조회 API' })
  @ApiOkResponse({ type: UserResponse })
  @Get('/my')
  async findUser(@AuthUser() user) {
    return user;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ description: '사용자 판매글 조회 API' })
  @Get('/my/articles')
  async findMyAritcles(@AuthUser() user: User) {
    const articles = await this.usersService.findMyArticles(user.id);
    return articles;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ description: '사용자 관심글 조회 API' })
  @Get('/my/likes')
  async findMyLikeArticles(@AuthUser() user: User) {
    const articles = await this.usersService.findMyLikeArticles(user.id);
    return articles;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ description: '사용자 모든 채팅 조회 API' })
  @Get('/my/chats')
  async findMyChats(@AuthUser() user: User) {
    const articles = await this.usersService.findAllChats(user.id);
    return articles;
  }
}
