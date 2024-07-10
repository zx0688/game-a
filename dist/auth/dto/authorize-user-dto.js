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
exports.WebAppInitDataDto = exports.TokenDto = exports.LoginDto = exports.WebAppUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class WebAppUserDto {
}
exports.WebAppUserDto = WebAppUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "296065026",
    }),
    __metadata("design:type", Number)
], WebAppUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "Evgenii",
    }),
    __metadata("design:type", String)
], WebAppUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "Kutepov",
    }),
    __metadata("design:type", String)
], WebAppUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "Evgeny_Kutepov",
    }),
    __metadata("design:type", String)
], WebAppUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebAppUserDto.prototype, "language_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], WebAppUserDto.prototype, "allows_write_to_pm", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
class TokenDto {
}
exports.TokenDto = TokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "26541fcd09f7b89b76db07313ee15a663f8639f6b1aec64e6053994befc7efc1",
        description: "хеш запросов на бек"
    }),
    __metadata("design:type", String)
], TokenDto.prototype, "hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "234324324",
        description: "id игрока на платформе"
    }),
    __metadata("design:type", String)
], TokenDto.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 173243243,
        description: "истечение токен"
    }),
    __metadata("design:type", Number)
], TokenDto.prototype, "expire", void 0);
class WebAppInitDataDto {
}
exports.WebAppInitDataDto = WebAppInitDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "AAECmKURAAAAAAKYpRHolqmy",
    }),
    __metadata("design:type", String)
], WebAppInitDataDto.prototype, "query_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", WebAppUserDto)
], WebAppInitDataDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "1720557663",
    }),
    __metadata("design:type", String)
], WebAppInitDataDto.prototype, "auth_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "26541fcd09f7b89b76db07313ee15a663f8639f6b1aec64e6053994befc7efc1",
    }),
    __metadata("design:type", String)
], WebAppInitDataDto.prototype, "hash", void 0);
//# sourceMappingURL=authorize-user-dto.js.map