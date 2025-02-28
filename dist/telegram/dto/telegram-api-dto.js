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
exports.UpdateDto = exports.MessageDto = exports.SuccessPaymentDto = exports.PreCheckoutQuery = exports.InvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InvoiceDto {
}
exports.InvoiceDto = InvoiceDto;
class PreCheckoutQuery {
}
exports.PreCheckoutQuery = PreCheckoutQuery;
class SuccessPaymentDto {
}
exports.SuccessPaymentDto = SuccessPaymentDto;
class MessageDto {
}
exports.MessageDto = MessageDto;
class UpdateDto {
}
exports.UpdateDto = UpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "айди сообщения",
        default: 234
    }),
    __metadata("design:type", Number)
], UpdateDto.prototype, "update_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "тело сообщения",
    }),
    __metadata("design:type", MessageDto)
], UpdateDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "проверка готовности совершить платеж",
    }),
    __metadata("design:type", PreCheckoutQuery)
], UpdateDto.prototype, "pre_checkout_query", void 0);
//# sourceMappingURL=telegram-api-dto.js.map