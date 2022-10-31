import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { doucmentConfig, swaggerCustomOptions } from './config/document.config';
import { Environment } from './config/validate.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const isProduction = configService.get('NODE_ENV') === Environment.Production;

  const document = SwaggerModule.createDocument(app, doucmentConfig);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: isProduction,
    }),
  );
  await app.listen(port);
}

bootstrap();
