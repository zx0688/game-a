"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const telegram_service_1 = require("./telegram/telegram.service");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cors = require("cors");
const user_controller_1 = require("./user/user.controller");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin'],
        credentials: true
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BullGame')
        .setDescription('The Game Bui=ll API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const telegram = app.get(telegram_service_1.TelegramService);
    await telegram.initBot();
    const users = app.get(user_controller_1.UserController);
    await users.updateLeaderboard();
    await app.listen(8443);
    common_1.Logger.log("Server is running...");
}
bootstrap();
//# sourceMappingURL=main.js.map