import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { AxiosResponse } from 'axios'
import { HttpModule, HttpService } from '@nestjs/axios';
import { UpdateDto } from './dto/telegram-api-dto';
import { UserService } from 'src/user/user.service';
import { GameDataInstance } from 'src/user/dto/game-data.dto';
import { Item } from 'src/user/schema/user.schema';
import { Telegraf } from 'telegraf';


export const botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
const bot = new Telegraf(botToken);

@Injectable()
export class TelegramService {

    constructor(private userService: UserService, private httpService: HttpService) { }

    async initBot() {

        bot.start((ctx) => ctx.reply('Welcome!'));
        bot.on('pre_checkout_query', (ctx) => {
            // Проверка платежа
            ctx.answerPreCheckoutQuery(true);
            Logger.log("precheck" + JSON.stringify(ctx));
        });

        // Обработка успешных платежей
        bot.on('successful_payment', (ctx) => {
            // Выдача продукта
            ctx.reply('Спасибо за покупку! Вот ваш продукт.');
            Logger.log("suc" + JSON.stringify(ctx));
        });

        bot.command('pay', (ctx) => {
            ctx.reply('Welcome!');
            ctx.replyWithInvoice({
                title: 'Test Product',
                description: 'This is a test product',
                payload: 'test_payload',
                provider_token: "",
                currency: 'USD',
                prices: [{ label: 'Test Product', amount: 1000 }],
                start_parameter: 'test-payment',
            });
        });
        bot.launch();
        await bot.createWebhook({ domain: "https://5.159.103.206:8443/telegram/webhook" });
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
            const reward = new Item();
            reward.level = GameDataInstance.levelStars[update.message.successful_payment.total_amount];
            user.items.push(reward);
            await user.save();
        }

        return update;
    }

    //     public checkAndSetWebhook() {
    //         const url = `https://api.telegram.org/bot${botToken}/getWebhookInfo`;
    //         console.log(`info webhook... ${url}`);
    //         this.httpService.get(url).pipe(
    //             map(response => {
    //                 if (response.data.ok) {
    //                     return response.data.result.url;
    //                 } else {
    //                     throw new Error('Webhook setup failed!');
    //                 }
    //             })
    //         ).subscribe({
    //             next: (data) => {
    //                 console.log('Current webhook is ', data == "" ? "null" : data);
    //                 if (data != webhookUrl)
    //                     this.setWebhook();
    //             },
    //             error: (error) => console.error('Error info webhook:', error.response.data)
    //         });
    // 
    //     }
    // 
    //     private setWebhook() {
    //         const url = `https://api.telegram.org/bot${botToken}/setWebhook`;
    //         const body = {
    //             "url": webhookUrl,
    //             "allowed_updates": ['successful_payment', 'pre_checkout_query']
    //         };
    //         console.log(`set webhook... ${url}`);
    //         this.httpService.post(url, body).pipe(
    //             map(response => {
    //                 if (response.data.ok) {
    //                     return response.data;
    //                 } else {
    //                     throw new Error('Webhook setup failed');
    //                 }
    //             })
    //         ).subscribe({
    //             next: (data) => console.log('Webhook set successfully:', data),
    //             error: (error) => console.error('Error setting webhook:', error.response.data)
    //         });
    //     }

}
