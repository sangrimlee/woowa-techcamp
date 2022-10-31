import { DocumentBuilder } from '@nestjs/swagger';

export const documentConfig = new DocumentBuilder()
  .setTitle('우아마켓(Woowa Market) API')
  .setDescription('우아마켓(Woowa Market)의 API 공식문서입니다.')
  .setVersion('1.0.0')
  .addServer('/api')
  .build();
