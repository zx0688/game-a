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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./schema/user.schema");
const game_data_dto_1 = require("./dto/game-data.dto");
const auth_service_1 = require("../auth/auth.service");
const authorize_user_dto_1 = require("../auth/dto/authorize-user-dto");
const action_service_1 = require("../action/action.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const schedule_1 = require("@nestjs/schedule");
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("./dto/user-response.dto");
let UserController = class UserController {
    constructor(cache, userService, authService, actionService) {
        this.cache = cache;
        this.userService = userService;
        this.authService = authService;
        this.actionService = actionService;
    }
    async getProfile(authorizationData) {
        const token = this.authService.authorization(authorizationData);
        if (!token)
            throw new common_1.HttpException("Unauth user!", common_1.HttpStatus.UNAUTHORIZED);
        const user = await this.userService.getByUidOrCreate(authorizationData.user);
        const timestamp_next_week = this.userService.getTimestampNextWeek();
        const resp = new user_response_dto_1.ProfileResponseDto({
            "timestamp": Date.now(),
            "user": user,
            "data": game_data_dto_1.GameDataInstance,
            "timestampNextWeek": timestamp_next_week,
            "leaderboard": user_service_1.UserService.LeaderBoardCacheInstance,
            "token": token
        });
        return resp;
    }
    async getItems(token) {
        this.authService.checkHash(token);
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new common_1.HttpException("user not found!", common_1.HttpStatus.EXPECTATION_FAILED);
        return user.items;
    }
    async updateLeaderboard() {
        common_1.Logger.log("Обновление таблицы лидеров");
        this.userService.createTimestampNextWeek();
        const leaderboard = await this.userService.createLeaderBoard();
        return;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("get"),
    (0, swagger_1.ApiOperation)({
        summary: "Получение профиля юзера. Запрашивается один раз в начале игровой сессии. В теле запроса объект Telegram WebAppInitData. Если профиля нет, он создается. Возвращает Игровой объект User, содержащий количество монет, уровень, звезды. Возвращает игровые данные, стоимость звез на уровень, лоты (товары). Возвращает время следующей недели и таблицу лидеров."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: user_response_dto_1.ProfileResponseDto
    }),
    (0, swagger_1.ApiParam)({
        name: 'authorizationData',
        required: true,
        description: 'WebAppInitData'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_user_dto_1.WebAppInitDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("items"),
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка наград пользователя. Для запроса нужен игровой токен от profile/get. Все неподтвержденые награды и покупки. Для фактического начисления награды на счет необходимо вызывать метод Accept. Последовательность запросов такая: 1. Покупка (просмотр рекламы) 2. Вызов этого запроса по успешному колбеку 3. Подтверждение награды методом Accept - здесь уже можно показать анимацию выдачи' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: [user_schema_1.Item]
    }),
    (0, swagger_1.ApiBody)({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: authorize_user_dto_1.TokenDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getItems", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление таблицы лидеров по расписанию, раз в 2 часа' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateLeaderboard", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('profile'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        auth_service_1.AuthService,
        action_service_1.ActionService])
], UserController);
//# sourceMappingURL=user.controller.js.map