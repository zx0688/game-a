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
exports.ActionController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const action_service_1 = require("./action.service");
const auth_service_1 = require("../auth/auth.service");
const authorize_user_dto_1 = require("../auth/dto/authorize-user-dto");
const cache_manager_1 = require("@nestjs/cache-manager");
const swagger_1 = require("@nestjs/swagger");
const action_response_dto_1 = require("./dto/action-response.dto");
let ActionController = class ActionController {
    constructor(cache, userService, actionService, authService) {
        this.cache = cache;
        this.userService = userService;
        this.actionService = actionService;
        this.authService = authService;
    }
    async collect(value, token) {
        this.authService.checkHash(token);
        const timestamp = Date.now();
        const leaderboard = await this.cache.get('leaderboard');
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await this.actionService.collect(user, value);
        return new action_response_dto_1.ActionResponseDto({
            timestamp: timestamp,
            leaderboard: leaderboard,
            updated: update
        });
    }
    async quest(id, token) {
        this.authService.checkHash(token);
        const response = await this.handleAction(token.uid, user => this.actionService.quest(user, id));
        return new action_response_dto_1.ActionResponseDto(response);
    }
    async accept(id, token) {
        this.authService.checkHash(token);
        return await this.handleAction(token.uid, user => this.actionService.accept(user, id));
    }
    async handleAction(uid, updateFunction) {
        const timestamp = Date.now();
        const leaderboard = await this.cache.get('leaderboard');
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await updateFunction(user);
        let response = {
            "timestamp": timestamp,
            "leaderboard": leaderboard,
            "updated": update
        };
        return response;
    }
};
exports.ActionController = ActionController;
__decorate([
    (0, common_1.Post)("collect"),
    (0, swagger_1.ApiOperation)({ summary: 'Сбор монет. Запрос отправляется каждый раз при сборе монет, требует игровой токен который выдается profile/get' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: action_response_dto_1.ActionResponseDto
    }),
    (0, swagger_1.ApiBody)({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: authorize_user_dto_1.TokenDto
    }),
    (0, swagger_1.ApiParam)({
        name: 'value',
        required: true,
        description: 'Значение монет для добавления'
    }),
    __param(0, (0, common_1.Query)("value")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "collect", null);
__decorate([
    (0, common_1.Post)("quest"),
    (0, swagger_1.ApiOperation)({ summary: 'Выполнить задание. Требует игровой токен от profile/get. Отправить этот запрос при просмотре рекламы или любого другого задания. Задание можно выполнить только один раз. Если у задания есть награда, она добавляется в список ожидающих. Запрос ожидающих наград profile/items. Подтверждение награды action/accept' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: action_response_dto_1.ActionResponseDto
    }),
    (0, swagger_1.ApiBody)({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: authorize_user_dto_1.TokenDto
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'id задания'
    }),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "quest", null);
__decorate([
    (0, common_1.Post)("accept"),
    (0, swagger_1.ApiOperation)({ summary: 'Получить ожидающую награду или товар. Требует игровой токен полученный profile/get. После выполнения ордера или задания, награда добавляется в список наград, которые необходимо получить этим методом' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: action_response_dto_1.ActionResponseDto
    }),
    (0, swagger_1.ApiBody)({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: authorize_user_dto_1.TokenDto
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'id задания'
    }),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "accept", null);
exports.ActionController = ActionController = __decorate([
    (0, common_1.Controller)('action'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        action_service_1.ActionService,
        auth_service_1.AuthService])
], ActionController);
//# sourceMappingURL=action.controller.js.map