"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const crypto_1 = require("crypto");
const telegram_service_1 = require("../telegram/telegram.service");
let AuthService = class AuthService {
    authorization(authorizationData) {
        const data = authorizationData;
        if ((Date.now() / 1000 - data.auth_date) > 86400)
            throw new common_1.HttpException(`Auth data is outdated`, common_1.HttpStatus.UNAUTHORIZED);
        const hash = data.hash;
        delete data.hash;
        const secretKey = crypto
            .createHash("sha256")
            .update(telegram_service_1.botToken)
            .digest();
        const dataCheckString = Object.keys(data)
            .sort()
            .map((key) => `${key}=${data[key]}`)
            .join("\n");
        const computedHash = crypto
            .createHmac("sha256", secretKey)
            .update(dataCheckString)
            .digest("hex");
        if (process.env.NODE_ENV === 'development') {
            console.log("dev env auth!");
        }
        else if (computedHash !== hash) {
            throw new common_1.HttpException(`Verification failed!`, common_1.HttpStatus.UNAUTHORIZED);
        }
        const uid = authorizationData.user.id.toString();
        const expire = data.auth_date + 86400;
        const token = this.createHash(uid, expire);
        return {
            uid: uid,
            expire: expire,
            hash: token
        };
    }
    createHash(uid, expire) {
        return (0, crypto_1.createHash)('sha256').update(`${uid}${expire}E|9No|6owY$FmqrH$V08~`).digest('hex');
    }
    checkHash(token) {
        if (process.env.NODE_ENV === 'development' || token.hash == "Gm2T~}@AnL%l2}NvxcOQ")
            return { message: "you are in develop mode. auth doesnt needed" };
        if (Math.floor(Date.now() / 1000) > token.expire)
            throw new common_1.HttpException("Verification failed due to timeout", common_1.HttpStatus.UNAUTHORIZED);
        const hash = this.createHash(token.uid, token.expire);
        if (hash !== token.hash)
            throw new common_1.HttpException("Verification has failed", common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map