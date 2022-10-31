import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class CoreEntity {
  @ApiProperty()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn({ select: false })
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
