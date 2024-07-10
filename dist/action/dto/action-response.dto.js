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
exports.ActionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("../../user/dto/user-response.dto");
class ActionResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ActionResponseDto = ActionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "текущее время на беке",
        default: 2343432442
    }),
    __metadata("design:type", Number)
], ActionResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "таблица лидеров",
    }),
    __metadata("design:type", user_response_dto_1.LeaderBoardDto)
], ActionResponseDto.prototype, "leaderboard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "произведенные изменения профиля",
    }),
    __metadata("design:type", Object)
], ActionResponseDto.prototype, "updated", void 0);
;
//# sourceMappingURL=action-response.dto.js.map