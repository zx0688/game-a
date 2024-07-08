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
const game_data_dto_1 = require("./dto/game-data.dto");
const auth_service_1 = require("../auth/auth.service");
const authorize_user_dto_1 = require("../auth/dto/authorize-user-dto");
const action_service_1 = require("../action/action.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let UserController = class UserController {
    constructor(cache, userService, authService, actionService) {
        this.cache = cache;
        this.userService = userService;
        this.authService = authService;
        this.actionService = actionService;
    }
    async getProfile(authorizationData) {
        const token = this.authService.authorization(authorizationData);
        const uid = token.uid;
        const user = await this.userService.getByUidOrCreate(authorizationData.user);
        const timestamp_week = this.userService.getTimestampNextWeek();
        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "user": user,
            "data": game_data_dto_1.GameDataInstance,
            "timestampNextWeek": timestamp_week,
            "leaderboard": leaderboard,
            "token": token
        };
        return response;
    }
    async getItems(token) {
        this.authService.checkHash(token);
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new common_1.HttpException("user not found!", common_1.HttpStatus.EXPECTATION_FAILED);
        return user.reward;
    }
    async getFriendProfiles(uids, token) {
        this.authService.checkHash(token);
        const uid = token.uid;
        if (!uids)
            throw new Error("Error: uids is empty!");
        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "leaderboard": leaderboard,
            "friends": await this.userService.getFriends(uids, this.userService.getTimestampNextWeek())
        };
        return response;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_user_dto_1.WebAppInitDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("items"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getItems", null);
__decorate([
    (0, common_1.Get)("friends"),
    __param(0, (0, common_1.Query)('uids', new common_1.ParseArrayPipe({ items: String, separator: ',' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriendProfiles", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('profile'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        auth_service_1.AuthService,
        action_service_1.ActionService])
], UserController);
//# sourceMappingURL=user.controller.js.map