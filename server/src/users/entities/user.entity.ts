import * as bcrypt from 'bcrypt';
import CoreEntity from 'src/common/entities/core.entity';
import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { Store } from 'src/stores/entities';

@Entity()
export class User extends CoreEntity {
  @ApiProperty()
  @IsString()
  @Length(2, 24)
  @Column({
    type: 'varchar',
    length: 24,
  })
  name: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(128)
  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    select: false,
  })
  password: string;

  @OneToOne(() => Store, { eager: true })
  @JoinColumn()
  store: Store;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error(error);
      throw new HttpException({ message: 'hash error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    try {
      const isPasswordMatch = await bcrypt.compare(plainPassword, this.password);
      return isPasswordMatch;
    } catch (error) {
      console.error(error);
      throw new HttpException({ message: 'hash error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
