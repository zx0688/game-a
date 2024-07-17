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
exports.ProfileResponseDto = exports.UserLeaderDto = exports.LeaderBoardDto = void 0;
const authorize_user_dto_1 = require("../../auth/dto/authorize-user-dto");
const user_schema_1 = require("../schema/user.schema");
const game_data_dto_1 = require("./game-data.dto");
const swagger_1 = require("@nestjs/swagger");
class LeaderBoardDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LeaderBoardDto = LeaderBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "топ пользователи с общим количеством монет",
        default: []
    }),
    __metadata("design:type", Array)
], LeaderBoardDto.prototype, "top_total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "все пользователи с общим количеством монет",
        default: []
    }),
    __metadata("design:type", Array)
], LeaderBoardDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "топ пользователей за неделю",
        default: []
    }),
    __metadata("design:type", Array)
], LeaderBoardDto.prototype, "top_week", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "топ пользователей за неделю",
        default: []
    }),
    __metadata("design:type", Array)
], LeaderBoardDto.prototype, "week", void 0);
;
class UserLeaderDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.UserLeaderDto = UserLeaderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "профиль на платформе",
    }),
    __metadata("design:type", authorize_user_dto_1.WebAppUserDto)
], UserLeaderDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "монеты пользоватля",
    }),
    __metadata("design:type", user_schema_1.Coins)
], UserLeaderDto.prototype, "coins", void 0);
;
class ProfileResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ProfileResponseDto = ProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 1231234124,
        description: "временная метка"
    }),
    __metadata("design:type", Number)
], ProfileResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "игровой профиль"
    }),
    __metadata("design:type", user_schema_1.User)
], ProfileResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "игровые данные"
    }),
    __metadata("design:type", game_data_dto_1.GameDataDto)
], ProfileResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 1231234124,
        description: "временная метка следующей недели"
    }),
    __metadata("design:type", Number)
], ProfileResponseDto.prototype, "timestampNextWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "таблица лидеров"
    }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "leaderboard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "игровой токен"
    }),
    __metadata("design:type", authorize_user_dto_1.TokenDto)
], ProfileResponseDto.prototype, "token", void 0);
//# sourceMappingURL=user-response.dto.js.map