import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { User } from './entities';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { AuthUser, UseAuthGuard } from 'src/auth/decorators';

@ApiTags('사용자 관련 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: '사용자 추가' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }

  @UseAuthGuard()
  @ApiOperation({ description: '사용자 정보 수정' })
  @Patch()
  async updateUser(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(user.id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @UseAuthGuard()
  @ApiOperation({ description: '사용자 정보 삭제' })
  @Delete()
  async deleteUser(@AuthUser() user: User) {
    await this.usersService.deleteUser(user.id);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @UseAuthGuard()
  @ApiOperation({ description: '내 프로필 조회' })
  @Get('my')
  async getMyProfile(@AuthUser() user: User) {
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @ApiOperation({ description: 'ID로 사용자 찾기' })
  @Get('/:id')
  async findUserById(@Param('id') userId: string) {
    const user = await this.usersService.findUserById(userId);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
