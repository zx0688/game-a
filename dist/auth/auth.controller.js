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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const authorize_user_dto_1 = require("./dto/authorize-user-dto");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async auth(authorizationData) {
        return this.authService.authorization(authorizationData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Запрос авторизации на игровом сервере, например, если срок игрового токена истек. Profile/Get выдает токен после успешной авторизации в Telegram. С этим токеном нужно делать запросы на игровой сервер. Если токен истек его нужно перезапрашивать этим методом' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: authorize_user_dto_1.TokenDto,
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
], AuthController.prototype, "auth", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map