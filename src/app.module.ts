import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameDataController } from './game-data/game-data.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';


const uri = "mongodb+srv://root:root@cluster0.y6mrt.mongodb.net/game-test1?retryWrites=true&w=majority"
//const uri = "mongodb://127.0.0.1:27017/game";

@Module({
  imports: [UserModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
