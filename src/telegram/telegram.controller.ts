import { Body, Controller, Get, Inject } from '@nestjs/common';
import { UpdateDto } from './dto/telegram-api-dto';
import { TelegramService } from './telegram.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('telegram')
export class TelegramController {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache, private telegramService: TelegramService) { }

    @Get("webhook")
    async webhook(@Body() data: UpdateDto) {
        const id = data.update_id.toString();
        const value = await this.cache.get(id);
        if (value) return;
        this.cache.set(data.update_id.toString(), "", 600);

        return await this.telegramService.webhook(data);
    }
}
