import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { IntIDEntity } from 'src/common/entities';
import { Article } from 'src/articles/entities';

@Entity()
export class Region extends IntIDEntity {
  @ApiProperty({ description: '지역 이름' })
  @Column({ length: 256, unique: true })
  @IsString()
  name: string;

  @OneToMany(() => Article, (article) => article.region)
  articles: Article[];
}
