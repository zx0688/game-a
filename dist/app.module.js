"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.uri = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const action_module_1 = require("./action/action.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const telegram_module_1 = require("./telegram/telegram.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const leaderboard_module_1 = require("./leaderboard/leaderboard.module");
const schedule_1 = require("@nestjs/schedule");
exports.uri = "mongodb+srv://root:root@cluster0.y6mrt.mongodb.net/game-test1?retryWrites=true&w=majority";
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), telegram_module_1.TelegramModule, user_module_1.UserModule, mongoose_1.MongooseModule.forRoot(exports.uri), action_module_1.ActionModule, cache_manager_1.CacheModule.register({
                ttl: 900,
                max: 1000,
                isGlobal: true
            }), leaderboard_module_1.LeaderboardModule],
        exports: [cache_manager_1.CacheModule],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, auth_service_1.AuthService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map