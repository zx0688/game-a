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
exports.TelegramController = void 0;
const common_1 = require("@nestjs/common");
const telegram_api_dto_1 = require("./dto/telegram-api-dto");
const telegram_service_1 = require("./telegram.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const swagger_1 = require("@nestjs/swagger");
let TelegramController = class TelegramController {
    constructor(cache, telegramService) {
        this.cache = cache;
        this.telegramService = telegramService;
    }
    async webhook(data) {
        common_1.Logger.log("webhook:" + JSON.stringify(data));
        const id = data.update_id.toString();
        const value = await this.cache.get(id);
        if (value)
            return;
        this.cache.set(data.update_id.toString(), "", 600);
        return await this.telegramService.webhook(data);
    }
};
exports.TelegramController = TelegramController;
__decorate([
    (0, common_1.Post)("webhook"),
    (0, swagger_1.ApiOperation)({ summary: 'вебхук для платежей. Telegram отправляет сюда данные ордера на покупку товара, объект Update, проверяет у игрового сервера доступен ли товар для продажи.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: telegram_api_dto_1.UpdateDto,
    }),
    (0, swagger_1.ApiBody)({
        description: 'Сообщения платформы',
        required: true,
        type: telegram_api_dto_1.UpdateDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegram_api_dto_1.UpdateDto]),
    __metadata("design:returntype", Promise)
], TelegramController.prototype, "webhook", null);
exports.TelegramController = TelegramController = __decorate([
    (0, common_1.Controller)('telegram'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, telegram_service_1.TelegramService])
], TelegramController);
//# sourceMappingURL=telegram.controller.js.map