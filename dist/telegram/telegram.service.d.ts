import { HttpService } from '@nestjs/axios';
import { UpdateDto } from './dto/telegram-api-dto';
import { UserService } from 'src/user/user.service';
export declare const botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
export declare const webhookUrl = "https://5.159.103.206:8443/telegram/webhook";
export declare class TelegramService {
    private userService;
    private httpService;
    constructor(userService: UserService, httpService: HttpService);
    initBot(): Promise<void>;
    webhook(update: UpdateDto): Promise<UpdateDto | null>;
    checkAndSetWebhook(): void;
    private setWebhook;
}
