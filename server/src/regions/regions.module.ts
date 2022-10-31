import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  exports: [TypeOrmModule, RegionsService],
  providers: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
