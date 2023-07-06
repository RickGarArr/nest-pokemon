import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_PORT } from './config/env.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  // to deploy localhost
  // const configService = app.get(ConfigService);
  // await app.listen(configService.get(API_PORT));

  const port = +process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App listen in port: ${port}`);
  
}
bootstrap();
