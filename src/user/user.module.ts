import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { GameDataController } from 'src/game-data/game-data.controller';

@Module({
  providers: [UserService],
  controllers: [UserController, GameDataController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UserModule { }
