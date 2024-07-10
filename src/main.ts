import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './telegram/telegram.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  telegram.initBot();

  await app.listen(8443);

}

bootstrap();
