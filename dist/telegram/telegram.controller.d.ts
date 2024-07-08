import { UpdateDto } from './dto/telegram-api-dto';
import { TelegramService } from './telegram.service';
import { Cache } from 'cache-manager';
export declare class TelegramController {
    private cache;
    private telegramService;
    constructor(cache: Cache, telegramService: TelegramService);
    webhook(data: UpdateDto): Promise<UpdateDto>;
}
