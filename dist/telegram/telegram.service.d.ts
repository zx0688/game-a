import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { Item, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
export declare const botToken = "7471815045:AAHTC3uTEjh9I1V5Wag0FtfsEmoXi5zfegA";
export declare class TelegramService {
    private userService;
    private httpService;
    private userModel;
    constructor(userService: UserService, httpService: HttpService, userModel: Model<UserDocument>);
    initBot(): Promise<void>;
    sendItemToUser(uid: string, reward: Item): Promise<void>;
}
