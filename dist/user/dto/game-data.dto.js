"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDataInstance = exports.GameDataDto = void 0;
class GameDataDto {
    constructor() {
        this.levelStars = levelStars;
        this.referral = referral;
        this.referralBonus = referralBonus;
        this.quests = viralQuestReward;
    }
}
exports.GameDataDto = GameDataDto;
const levelStars = {
    "50": 9,
    "75": 18,
    "100": 27,
    "150": 36,
    "250": 45,
    "350": 54,
    "500": 63,
    "750": 72,
    "1000": 81,
    "1500": 89,
    "2500": 99
};
const referral = {
    "1": 343,
    "2": 543,
    "3": 23
};
const referralBonus = {
    "1": 15
};
const viralQuestReward = {
    "3423324": 150,
    "543354": 200
};
exports.GameDataInstance = new GameDataDto();
//# sourceMappingURL=game-data.dto.js.map