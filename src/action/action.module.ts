import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
    providers: [ActionService, UserService, AuthService],
    controllers: [ActionController],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class ActionModule { }
