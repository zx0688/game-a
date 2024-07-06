import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const appService = app.get(AppService);

  appService.setWebhook().subscribe({
    next: (data) => console.log('Webhook set successfully:', data),
    error: (error) => console.error('Error setting webhook:', error.response.data)
  });

}

bootstrap();
