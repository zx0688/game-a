import { Inject, Injectable } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { AxiosResponse } from 'axios'
import { HttpModule, HttpService } from '@nestjs/axios';
import { UpdateDto } from './dto/telegram-api-dto';
import { UserService } from 'src/user/user.service';
import { GameDataInstance } from 'src/user/dto/game-data.dto';
import { Reward } from 'src/user/schema/user.schema';
import { Telegraf } from 'telegraf';


export const botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
export const webhookUrl = `https://localhost:8443/telegram/webhook`
const bot = new Telegraf(botToken);

@Injectable()
export class TelegramService {

    constructor(private userService: UserService, private httpService: HttpService) { }

    async initBot() {

        //bot.start((ctx) => ctx.reply('Welcome'))
        //bot.help((ctx) => ctx.reply('Send me a sticker'))
        bot.on('message', (ctx) => {
            const chatId = ctx.message.chat.id;
            bot.telegram.sendMessage(chatId, "234234");
        });
        //bot.hears('hi', (ctx) => ctx.reply('Hey there'));
        bot.launch();
    }

    async webhook(update: UpdateDto): Promise<UpdateDto | null> {

        //check if goods are ready
        if (update.pre_checkout_query) {
            const user = await this.userService.getByUid(update.pre_checkout_query.from.id.toString());
            if (!user)
                return null;
            if (update.pre_checkout_query.currency != "XTR")
                return null;
            if (!GameDataInstance.levelStars[update.pre_checkout_query.total_amount])
                return null;

        }
        //payment successful, send the item to user
        else if (update.message.successful_payment && update.message.invoice) {
            const user = await this.userService.getByUid(update.pre_checkout_query.from.id.toString());
            const reward = new Reward();
            reward.level = GameDataInstance.levelStars[update.message.successful_payment.total_amount];
            user.reward.push(reward);
            await user.save();
        }

        return update;
    }

    public checkAndSetWebhook() {
        const url = `https://api.telegram.org/bot${botToken}/getWebhookInfo`;
        console.log(`info webhook... ${url}`);
        this.httpService.get(url).pipe(
            map(response => {
                if (response.data.ok) {
                    return response.data.result.url;
                } else {
                    throw new Error('Webhook setup failed!');
                }
            })
        ).subscribe({
            next: (data) => {
                console.log('Current webhook is ', data == "" ? "null" : data);
                if (data != webhookUrl)
                    this.setWebhook();
            },
            error: (error) => console.error('Error info webhook:', error.response.data)
        });

    }

    private setWebhook() {
        const url = `https://api.telegram.org/bot${botToken}/setWebhook`;
        const body = {
            "url": webhookUrl,
            "allowed_updates": ['successful_payment', 'pre_checkout_query']
        };
        console.log(`set webhook... ${url}`);
        this.httpService.post(url, body).pipe(
            map(response => {
                if (response.data.ok) {
                    return response.data;
                } else {
                    throw new Error('Webhook setup failed');
                }
            })
        ).subscribe({
            next: (data) => console.log('Webhook set successfully:', data),
            error: (error) => console.error('Error setting webhook:', error.response.data)
        });
    }

}
