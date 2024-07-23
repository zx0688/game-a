import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { Item, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
export declare const botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
export declare class TelegramService {
    private userService;
    private httpService;
    private userModel;
    constructor(userService: UserService, httpService: HttpService, userModel: Model<UserDocument>);
    initBot(): Promise<void>;
    sendItemToUser(uid: string, reward: Item): Promise<void>;
}
