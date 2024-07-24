import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { AxiosResponse } from 'axios'
import { HttpModule, HttpService } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { GameDataInstance } from 'src/user/dto/game-data.dto';
import { Item, User, UserDocument } from 'src/user/schema/user.schema';
import { Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


export const botToken = "7471815045:AAHTC3uTEjh9I1V5Wag0FtfsEmoXi5zfegA";
const bot = new Telegraf(botToken);

@Injectable()
export class TelegramService {

    constructor(private userService: UserService, private httpService: HttpService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async initBot() {

        bot.on('pre_checkout_query', async (ctx) => {
            // Проверка платежа
            Logger.log("pre_checkout " + JSON.stringify(ctx));

            if (GameDataInstance.levelStars[ctx.preCheckoutQuery.invoice_payload] === null) {
                ctx.answerPreCheckoutQuery(false);
                return;
            }
            const user = await this.userService.getByUid(ctx.from.id.toString());
            if (!user) {
                ctx.answerPreCheckoutQuery(false);
                return;
            }

            ctx.answerPreCheckoutQuery(true);
        });

        // Обработка успешных платежей
        bot.on('successful_payment', async (ctx) => {
            // Выдача продукта

            Logger.log("successful payment " + JSON.stringify(ctx));
            const successful_payment = ctx?.message?.successful_payment ?? null;
            if (!successful_payment) {
                Logger.log("no payment information");
                return;
            }
            if (GameDataInstance.levelStars[successful_payment.invoice_payload] === null) {
                Logger.log("incorrect payment information");
                return;
            }
            var reward = new Item({ level: GameDataInstance.levelStars[successful_payment.invoice_payload] });
            await this.sendItemToUser(ctx.from.id.toString(), reward);
        });

        //await bot.createWebhook({ domain: "https://5.159.103.206:8443/telegram/webhook" });
        bot.launch();
    }

    async sendItemToUser(uid: string, reward: Item) {
        const user = await this.userService.getByUid(uid);
        user.items.push(reward);
        await this.userModel.updateOne({ uid: user.uid }, { items: user.items });
    }

}
