import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
