"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const telegram_service_1 = require("./telegram/telegram.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(8443);
    const telegram = app.get(telegram_service_1.TelegramService);
    telegram.initBot();
}
bootstrap();
//# sourceMappingURL=main.js.map