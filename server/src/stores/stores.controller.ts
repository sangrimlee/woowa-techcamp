import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateStoreDto } from './dtos';
import { StoresService } from './stores.service';
import { User } from 'src/users/entities';
import { AuthUser, UseAuthGuard } from 'src/auth/decorators';

@ApiTags('Store 관련 API')
@UseAuthGuard()
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({ description: 'Store 정보 수정' })
  @Patch()
  async updateStore(@AuthUser() user: User, @Body() updateStoreDto: UpdateStoreDto) {
    const storeId = user.store.id;
    await this.storesService.updateStore(storeId, updateStoreDto);
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
