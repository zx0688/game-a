"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = exports.webhookUrl = exports.botToken = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const user_service_1 = require("../user/user.service");
const game_data_dto_1 = require("../user/dto/game-data.dto");
const user_schema_1 = require("../user/schema/user.schema");
const telegraf_1 = require("telegraf");
exports.botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
exports.webhookUrl = `https://localhost:8443/telegram/webhook`;
const bot = new telegraf_1.Telegraf(exports.botToken);
let TelegramService = class TelegramService {
    constructor(userService, httpService) {
        this.userService = userService;
        this.httpService = httpService;
    }
    async initBot() {
        bot.on('message', (ctx) => {
            const chatId = ctx.message.chat.id;
            bot.telegram.sendMessage(chatId, "234234");
        });
        bot.launch();
    }
    async webhook(update) {
        if (update.pre_checkout_query) {
            const user = await this.userService.getByUid(update.pre_checkout_query.from.id.toString());
            if (!user)
                return null;
            if (update.pre_checkout_query.currency != "XTR")
                return null;
            if (!game_data_dto_1.GameDataInstance.levelStars[update.pre_checkout_query.total_amount])
                return null;
        }
        else if (update.message.successful_payment && update.message.invoice) {
            const user = await this.userService.getByUid(update.pre_checkout_query.from.id.toString());
            const reward = new user_schema_1.Reward();
            reward.level = game_data_dto_1.GameDataInstance.levelStars[update.message.successful_payment.total_amount];
            user.reward.push(reward);
            await user.save();
        }
        return update;
    }
    checkAndSetWebhook() {
        const url = `https://api.telegram.org/bot${exports.botToken}/getWebhookInfo`;
        console.log(`info webhook... ${url}`);
        this.httpService.get(url).pipe((0, rxjs_1.map)(response => {
            if (response.data.ok) {
                return response.data.result.url;
            }
            else {
                throw new Error('Webhook setup failed!');
            }
        })).subscribe({
            next: (data) => {
                console.log('Current webhook is ', data == "" ? "null" : data);
                if (data != exports.webhookUrl)
                    this.setWebhook();
            },
            error: (error) => console.error('Error info webhook:', error.response.data)
        });
    }
    setWebhook() {
        const url = `https://api.telegram.org/bot${exports.botToken}/setWebhook`;
        const body = {
            "url": exports.webhookUrl,
            "allowed_updates": ['successful_payment', 'pre_checkout_query']
        };
        console.log(`set webhook... ${url}`);
        this.httpService.post(url, body).pipe((0, rxjs_1.map)(response => {
            if (response.data.ok) {
                return response.data;
            }
            else {
                throw new Error('Webhook setup failed');
            }
        })).subscribe({
            next: (data) => console.log('Webhook set successfully:', data),
            error: (error) => console.error('Error setting webhook:', error.response.data)
        });
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, axios_1.HttpService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map