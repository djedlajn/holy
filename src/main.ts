import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as _ from 'lodash';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`/api`);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = _.get(process.env, 'PORT', 3333);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Articles API')
    .setDescription('Collection of articles API endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log('LISTENING', +PORT);
  });
}
bootstrap();
