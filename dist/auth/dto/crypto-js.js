"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTelegramWebAppData = void 0;
const crypto = require("crypto");
const telegram_service_1 = require("../../telegram/telegram.service");
function jsonToURLParameters(json) {
    const params = new URLSearchParams();
    params.append('user', JSON.stringify(json.user));
    Object.keys(json).forEach(key => {
        if (key !== 'user') {
            params.append(key, json[key]);
        }
    });
    return params.toString();
}
const verifyTelegramWebAppData = (winitData) => {
    const initData = new URLSearchParams(jsonToURLParameters(winitData));
    const hash = initData.get("hash");
    const dataToCheck = [];
    initData.sort();
    initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
    const secret = crypto
        .createHmac("sha256", "WebAppData")
        .update(telegram_service_1.botToken)
        .digest();
    const _hash = crypto
        .createHmac("sha256", secret)
        .update(dataToCheck.join("\n"))
        .digest("hex");
    return hash === _hash;
};
exports.verifyTelegramWebAppData = verifyTelegramWebAppData;
//# sourceMappingURL=crypto-js.js.map