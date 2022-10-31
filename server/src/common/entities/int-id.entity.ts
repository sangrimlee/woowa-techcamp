import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class IntIDEntity {
  @ApiProperty({
    description: 'Primary Key',
  })
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

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
