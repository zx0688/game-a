import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionController } from './action/action.controller';
import { ActionService } from './action/action.service';
import { ActionModule } from './action/action.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export const uri = "mongodb+srv://root:root@cluster0.y6mrt.mongodb.net/game-test1?retryWrites=true&w=majority"
export const botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
export const externalDomain = "localhost:8443";

@Module({
  imports: [UserModule, MongooseModule.forRoot(uri), ActionModule, HttpModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
