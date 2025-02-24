/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const port = app.get(ConfigService).get('PORT') || 3000;

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: path.join(__dirname, 'proto/auth.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
