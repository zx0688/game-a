import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionModule } from './action/action.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TelegramModule } from './telegram/telegram.module';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScheduleModule } from '@nestjs/schedule';

export const uri = "mongodb+srv://root:root@cluster0.y6mrt.mongodb.net/game-test1?retryWrites=true&w=majority"

@Module({
  imports: [ScheduleModule.forRoot(), TelegramModule, UserModule, MongooseModule.forRoot(uri), ActionModule, CacheModule.register({
    ttl: 900,
    max: 1000,
    isGlobal: true
  }), LeaderboardModule],
  exports: [CacheModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService]
})
export class AppModule { }
