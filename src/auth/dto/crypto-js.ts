
import { createHmac, timingSafeEqual } from 'crypto';
import * as crypto from 'crypto';
import { botToken } from 'src/telegram/telegram.service';

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
export const verifyTelegramWebAppData = (winitData): boolean => {
  const initData = new URLSearchParams(jsonToURLParameters(winitData));
  const hash = initData.get("hash");
  const dataToCheck: string[] = [];

  initData.sort();
  initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const _hash = crypto
    .createHmac("sha256", secret)
    .update(dataToCheck.join("\n"))
    .digest("hex");

  return hash === _hash;
}
