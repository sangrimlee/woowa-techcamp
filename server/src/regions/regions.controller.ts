import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';
import { AuthUser } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { RegionsService } from './regions.service';
import { RegionResponse } from './responses';
import {
  CreateUserRegionDto,
  UpdateUserRegionDto,
  DeleteUserRegionDto,
  SearchRegionDto,
} from './dtos';

@UseGuards(AuthGuard)
@ApiTags('동네 관련 API')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiOperation({ description: '사용자 동네 추가 API' })
  @Post('/')
  async createUserRegion(@AuthUser() user: User, @Body() createUserRegionDto: CreateUserRegionDto) {
    await this.regionsService.createUserRegion(user.id, createUserRegionDto);
  }

  @ApiOperation({ description: '사용자 동네 삭제 API' })
  @Delete('/')
  async deleteUserRegion(@AuthUser() user: User, @Body() deleteUserRegionDto: DeleteUserRegionDto) {
    await this.regionsService.deleteUserRegion(user.id, deleteUserRegionDto);
  }

  @ApiOperation({ description: '사용자 동네 변경 API' })
  @Patch('/')
  async updateUserRegion(@AuthUser() user: User, @Body() updateUserRegionDto: UpdateUserRegionDto) {
    await this.regionsService.updateUserRegion(user.id, updateUserRegionDto);
  }

  @ApiOperation({ description: '동네 검색 API' })
  @ApiOkResponse({ type: RegionResponse })
  @Get('/search')
  async searchRegions(@Query() searchRegionDto: SearchRegionDto) {
    return await this.regionsService.findRegionsByKeyword(searchRegionDto);
  }
}
