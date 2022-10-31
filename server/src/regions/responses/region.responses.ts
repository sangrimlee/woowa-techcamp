import { ApiProperty } from '@nestjs/swagger';
import { Region } from '../entities';

export class RegionResponse {
  @ApiProperty({ description: '동네', isArray: true, type: Region })
  regions: Region[];
}
