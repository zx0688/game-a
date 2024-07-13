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
exports.GameDataInstance = exports.GameDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GameDataDto {
    constructor() {
        this.levelStars = levelStars;
        this.durationRecovery = 34;
        this.referral = referral;
        this.referralBonus = referralBonus;
        this.quests = questReward;
    }
}
exports.GameDataDto = GameDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "продажа звез за уровень"
    }),
    __metadata("design:type", Object)
], GameDataDto.prototype, "levelStars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "время восстановления"
    }),
    __metadata("design:type", Number)
], GameDataDto.prototype, "durationRecovery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "рефералы"
    }),
    __metadata("design:type", Object)
], GameDataDto.prototype, "referral", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "бонусы за реферал"
    }),
    __metadata("design:type", Object)
], GameDataDto.prototype, "referralBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "задания"
    }),
    __metadata("design:type", Object)
], GameDataDto.prototype, "quests", void 0);
const levelStars = {
    "50": 9,
    "75": 18,
    "100": 27,
    "150": 36,
    "250": 45,
    "350": 54,
    "500": 63,
    "750": 72,
    "1000": 81,
    "1500": 89,
    "2500": 99
};
const referral = {
    "1": 343,
    "2": 543,
    "3": 23
};
const referralBonus = {
    "1": 15
};
const questReward = {
    "login": { coins: 234 },
    "543354": { coins: 33 }
};
exports.GameDataInstance = new GameDataDto();
//# sourceMappingURL=game-data.dto.js.map