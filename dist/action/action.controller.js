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
let ActionController = class ActionController {
    constructor(cache, userService, actionService, authService) {
        this.cache = cache;
        this.userService = userService;
        this.actionService = actionService;
        this.authService = authService;
    }
    async update(command, value, status, token) {
        this.authService.checkHash(token);
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "leaderboard": leaderboard,
            "updated": await this.actionService.applyCommand(user, command, value)
        };
        return response;
    }
};
exports.ActionController = ActionController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("command")),
    __param(1, (0, common_1.Query)("value")),
    __param(2, (0, common_1.Query)("status")),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, authorize_user_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "update", null);
exports.ActionController = ActionController = __decorate([
    (0, common_1.Controller)('action'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        action_service_1.ActionService,
        auth_service_1.AuthService])
], ActionController);
//# sourceMappingURL=action.controller.js.map