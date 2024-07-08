import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [TelegramService, UserService],
    controllers: [TelegramController],
    imports: [HttpModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class TelegramModule { }
