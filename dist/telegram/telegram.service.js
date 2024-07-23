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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = exports.botToken = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const user_service_1 = require("../user/user.service");
const game_data_dto_1 = require("../user/dto/game-data.dto");
const user_schema_1 = require("../user/schema/user.schema");
const telegraf_1 = require("telegraf");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
exports.botToken = "7373260082:AAEHUW41sZeLIy8z2wy29j0nxXl-F0Hchsc";
const bot = new telegraf_1.Telegraf(exports.botToken);
let TelegramService = class TelegramService {
    constructor(userService, httpService, userModel) {
        this.userService = userService;
        this.httpService = httpService;
        this.userModel = userModel;
    }
    async initBot() {
        bot.on('pre_checkout_query', async (ctx) => {
            common_1.Logger.log("pre_checkout " + JSON.stringify(ctx));
            if (game_data_dto_1.GameDataInstance.levelStars[ctx.preCheckoutQuery.invoice_payload] === null) {
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
        bot.on('successful_payment', async (ctx) => {
            common_1.Logger.log("successful payment " + JSON.stringify(ctx));
            const successful_payment = ctx?.message?.successful_payment ?? null;
            if (!successful_payment) {
                common_1.Logger.log("no payment information");
                return;
            }
            if (game_data_dto_1.GameDataInstance.levelStars[successful_payment.invoice_payload] === null) {
                common_1.Logger.log("incorrect payment information");
                return;
            }
            var reward = new user_schema_1.Item({ level: game_data_dto_1.GameDataInstance.levelStars[successful_payment.invoice_payload] });
            await this.sendItemToUser(ctx.from.id.toString(), reward);
        });
        bot.launch();
    }
    async sendItemToUser(uid, reward) {
        const user = await this.userService.getByUid(uid);
        user.items.push(reward);
        await this.userModel.updateOne({ uid: user.uid }, { items: user.items });
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [user_service_1.UserService, axios_1.HttpService, mongoose_1.Model])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map