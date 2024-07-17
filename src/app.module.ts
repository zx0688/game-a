import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionModule } from './action/action.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TelegramModule } from './telegram/telegram.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { UserService } from './user/user.service';


export const uri = "mongodb+srv://root:jFIIcBYnEGCURs7k@cluster0.y6mrt.mongodb.net/game-test1?retryWrites=true&w=majority"

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TelegramModule,
    UserModule,
    MongooseModule.forRoot(uri),
    ActionModule,
    CacheModule.register()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
