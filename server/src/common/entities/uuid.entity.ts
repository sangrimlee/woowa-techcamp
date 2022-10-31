import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UUIDEntity {
  @ApiProperty({
    description: 'Primary Key',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({
    description: '생성 날짜',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '수정 날짜',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
