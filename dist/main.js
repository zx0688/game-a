"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const telegram_service_1 = require("./telegram/telegram.service");
const swagger_1 = require("@nestjs/swagger");
const cors = require("cors");
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
    telegram.initBot();
    await app.listen(8443);
}
bootstrap();
//# sourceMappingURL=main.js.map