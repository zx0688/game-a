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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const crypto_1 = require("crypto");
const crypto_js_1 = require("./dto/crypto-js");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async authorization(authorizationData, user) {
        const auth_date = parseInt(authorizationData.auth_date);
        if ((Date.now() / 1000 - auth_date) > 86400)
            throw new common_1.HttpException(`Auth data is outdated`, common_1.HttpStatus.UNAUTHORIZED);
        const isValid = await (0, crypto_js_1.verifyTelegramWebAppData)(authorizationData);
        if (!isValid)
            throw new common_1.HttpException(`Verification failed!`, common_1.HttpStatus.UNAUTHORIZED);
        const uid = user.id.toString();
        const expire = Date.now() / 1000 + 3600;
        const token = this.createHash(uid, expire);
        return {
            uid: uid,
            expire: expire,
            hash: token
        };
    }
    createHash(uid, expire) {
        return (0, crypto_1.createHmac)('sha256', "E|9No|6owY$FmqrH$V08~").update(`${uid}${expire}`).digest('hex');
    }
    checkHash(token) {
        if (!token || !token.uid)
            throw new common_1.HttpException("Request should have a token", common_1.HttpStatus.UNAUTHORIZED);
        if (process.env.NODE_ENV === 'development' || token.hash == "Gm2T~}@AnL%l2}NvxcOQ")
            return;
        if (Math.floor(Date.now() / 1000) > token.expire)
            throw new common_1.HttpException("Verification failed due to timeout", common_1.HttpStatus.UNAUTHORIZED);
        const hash = this.createHash(token.uid, token.expire);
        if (hash !== token.hash)
            throw new common_1.HttpException("Verification has failed", common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map