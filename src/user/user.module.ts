import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { ActionService } from 'src/action/action.service';
import { ActionModule } from 'src/action/action.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { TelegramService } from 'src/telegram/telegram.service';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { LeaderboardController } from 'src/leaderboard/leaderboard.controller';

@Module({
  providers: [UserService, AuthService, ActionService],
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ActionModule],
})
export class UserModule { }
