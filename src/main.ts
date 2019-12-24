import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as _ from 'lodash';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`/api`);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = _.get(process.env, 'PORT', 3333);
  await app.listen(PORT, () => {
    console.log('LISTENING', +PORT);
  });
}
bootstrap();
