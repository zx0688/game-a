import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './telegram/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8443);

  const telegram = app.get(TelegramService);
  telegram.initBot();

}

bootstrap();
