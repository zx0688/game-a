"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionService = exports.ActionCommand = void 0;
const common_1 = require("@nestjs/common");
const game_data_dto_1 = require("../user/dto/game-data.dto");
const user_schema_1 = require("../user/schema/user.schema");
const user_service_1 = require("../user/user.service");
var ActionCommand;
(function (ActionCommand) {
    ActionCommand["COLLECT"] = "collect";
    ActionCommand["QUEST"] = "quest";
    ActionCommand["ACCEPT"] = "accept";
})(ActionCommand || (exports.ActionCommand = ActionCommand = {}));
let ActionService = class ActionService {
    constructor(userService) {
        this.userService = userService;
    }
    async applyCommand(user, command, value) {
        user.timestamp = Date.now();
        switch (command) {
            case ActionCommand.COLLECT:
                var intValue = parseInt(value);
                if (intValue != 1)
                    throw new common_1.HttpException("Error: value should be 1", common_1.HttpStatus.EXPECTATION_FAILED);
                this.addCoins(user, intValue);
                await user.save();
                return user.coins;
            case ActionCommand.ACCEPT:
                var reward = user.reward.find(r => r.id === value);
                if (!reward)
                    throw new common_1.HttpException(`Error: reward ${value} does not exists`, common_1.HttpStatus.EXPECTATION_FAILED);
                if (reward.coins) {
                    this.addCoins(user, reward.coins);
                }
                if (reward.level) {
                    user.level += reward.level;
                }
                user.reward = user.reward.filter(r => r !== reward);
                await user.save();
                return user.reward;
            case ActionCommand.QUEST:
                if (!(value in game_data_dto_1.GameDataInstance.quests))
                    throw new common_1.HttpException(`Error: quest ${value} is undefined`, common_1.HttpStatus.EXPECTATION_FAILED);
                if (user.quest_completed.includes(value))
                    throw new common_1.HttpException(`Error: quest ${value} already completed`, common_1.HttpStatus.EXPECTATION_FAILED);
                user.quest_completed.push(value);
                var reward = new user_schema_1.Reward();
                reward.coins = game_data_dto_1.GameDataInstance.quests[value];
                user.reward.push(reward);
                await user.save();
                return user.reward;
            default:
                throw new Error(`Error: undefined action command ${command}`);
        }
    }
    addCoins(user, value) {
        user.coins.coins_total += value;
        if (user.timestamp >= this.userService.getTimestampNextWeek())
            user.coins.coins_week = 0;
        user.coins.coins_week += value;
    }
};
exports.ActionService = ActionService;
exports.ActionService = ActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ActionService);
//# sourceMappingURL=action.service.js.map