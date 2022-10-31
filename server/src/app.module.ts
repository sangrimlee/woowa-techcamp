import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { envFilePath, Environment, validate } from './config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { ArticlesModule } from './articles/articles.module';
import { UploadModule } from './upload/upload.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('NODE_ENV') !== Environment.Production,
        extra: {
          decimalNumbers: true,
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'client', 'dist'),
      exclude: ['/api', '/docs'],
    }),
    UsersModule,
    AuthModule,
    RegionsModule,
    ArticlesModule,
    UploadModule,
    ChatsModule,
  ],
  providers: [],
})
export class AppModule {}
