import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './telegram/telegram.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as fs from 'fs'
import * as cors from 'cors';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';



export const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.use(cors());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('BullGame')
    .setDescription('The Game Bui=ll API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const telegram = app.get(TelegramService);
  await telegram.initBot();

  const users = app.get(UserController);
  await users.updateLeaderboard();

  await app.listen(8443);
  Logger.log("Server is running...");
}

bootstrap();
