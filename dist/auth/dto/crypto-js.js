"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTelegramWebAppData = verifyTelegramWebAppData;
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
async function verifyTelegramWebAppData(winitData) {
    const hash = winitData.hash;
    const data = transformInitData(winitData);
    const hex = await generateHex(data, telegram_service_1.botToken);
    return hash === hex;
}
function transformInitData(initData) {
    return Object.fromEntries(new URLSearchParams(initData));
}
async function generateHex(data, botToken) {
    const encoder = new TextEncoder();
    const checkString = await Object.keys(data)
        .filter((key) => key !== 'hash')
        .map((key) => `${key}=${data[key]}`)
        .sort()
        .join('\n');
    const secretKey = await crypto.subtle.importKey('raw', encoder.encode('WebAppData'), { name: 'HMAC', hash: 'SHA-256' }, true, ['sign']);
    const secret = await crypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));
    const signatureKey = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, true, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));
    const hex = [...new Uint8Array(signature)]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return hex;
}
//# sourceMappingURL=crypto-js.js.map