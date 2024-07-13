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
exports.UserSchema = exports.User = exports.Item = exports.Coins = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const authorize_user_dto_1 = require("../../auth/dto/authorize-user-dto");
class Coins {
}
exports.Coins = Coins;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "общее количество монет",
        default: 12
    }),
    __metadata("design:type", Number)
], Coins.prototype, "coins_total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Количество монет собранных за неделю",
        default: 12
    }),
    __metadata("design:type", Number)
], Coins.prototype, "coins_week", void 0);
let Item = class Item {
    constructor(partial = null) {
        if (partial != null)
            Object.assign(this, partial);
        this.id = new mongoose_2.default.Types.ObjectId().toString();
    }
};
exports.Item = Item;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id Не выданная награда",
        default: "1"
    }),
    __metadata("design:type", String)
], Item.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "монет в награде",
    }),
    __metadata("design:type", Number)
], Item.prototype, "coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "уровней в награде",
    }),
    __metadata("design:type", Number)
], Item.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "звезд в награде",
    }),
    __metadata("design:type", Number)
], Item.prototype, "stars", void 0);
exports.Item = Item = __decorate([
    (0, mongoose_1.Schema)(),
    __metadata("design:paramtypes", [Object])
], Item);
let User = class User {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id игрока в телеграмме",
        default: "1"
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "профиль на платформе"
    }),
    (0, mongoose_1.Prop)({ required: true, type: authorize_user_dto_1.WebAppUserDto }),
    __metadata("design:type", authorize_user_dto_1.WebAppUserDto)
], User.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "количество монет",
        default: 2
    }),
    (0, mongoose_1.Prop)({ type: Coins }),
    __metadata("design:type", Coins)
], User.prototype, "coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "уровнь",
        default: 1
    }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "количество звезд",
        default: 1
    }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "stars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "время истечения энергии",
        default: 32423423
    }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "timestamp_recovery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "время истечения энергии"
    }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], User.prototype, "loot_boxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ids завершеннх заданий",
        default: ["123", "343"]
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "quest_completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "время последних действий игрока",
        default: 234324234
    }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "не выданная награда",
        default: []
    }),
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId }], ref: 'Item' }),
    __metadata("design:type", Array)
], User.prototype, "items", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map