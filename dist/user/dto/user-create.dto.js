"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDto = void 0;
class UserCreateDto {
    constructor(data) {
        this.level = 1;
        this.stars = 0;
        this.uid = data.id.toString();
        this.username = data.username;
        this.photo_url = data.photo_url;
        this.timestamp_recovery = Date.now();
        this.reward = [];
        this.loot_boxes = {};
        this.quest_completed = [];
        this.coins = {
            "coins_per_week": 0,
            "coins_total": 0
        };
    }
}
exports.UserCreateDto = UserCreateDto;
//# sourceMappingURL=user-create.dto.js.map