import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { UserService } from 'src/user/user.service';
import { LeaderboardController } from './leaderboard.controller';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [LeaderboardService, UserService],
    controllers: [LeaderboardController],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class LeaderboardModule { }
