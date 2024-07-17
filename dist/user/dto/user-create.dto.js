"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDto = void 0;
const user_schema_1 = require("../schema/user.schema");
class UserCreateDto {
    constructor(data) {
        this.level = 1;
        this.stars = 0;
        this.uid = data.id.toString();
        this.energy = 100;
        this.user = data;
        this.items = [];
        this.loot_boxes = {};
        this.quest_completed = [];
        this.coins = new user_schema_1.Coins();
        this.coins.coins_total = 0;
        this.coins.coins_week = 0;
    }
}
exports.UserCreateDto = UserCreateDto;
//# sourceMappingURL=user-create.dto.js.map