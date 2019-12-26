import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';
import { ArticleRevisionModule } from './article-revision/article-revision.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { DraftModule } from './draft/draft.module';
import { UserModule } from './user/user.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('typeorm'),
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return { level: config.get('logging.level') };
      },
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    ArticleRevisionModule,
    DraftModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
