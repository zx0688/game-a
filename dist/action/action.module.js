"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionModule = void 0;
const common_1 = require("@nestjs/common");
const action_service_1 = require("./action.service");
const action_controller_1 = require("./action.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("../auth/auth.service");
let ActionModule = class ActionModule {
};
exports.ActionModule = ActionModule;
exports.ActionModule = ActionModule = __decorate([
    (0, common_1.Module)({
        providers: [action_service_1.ActionService, user_service_1.UserService, auth_service_1.AuthService],
        controllers: [action_controller_1.ActionController],
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }])],
    })
], ActionModule);
//# sourceMappingURL=action.module.js.map