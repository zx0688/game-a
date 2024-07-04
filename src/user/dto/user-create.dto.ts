import { Reward } from "../schema/user.schema";

export class UserCreateDto {
    uid: string;
    coins: any;
    level: number = 1;
    stars: number = 3;
    timestamp_recovery: number;
    loot_boxes: any;
    reward: Reward[];

    constructor(data: Partial<UserCreateDto> = {}) {
        Object.assign(this, data);
        this.timestamp_recovery = Date.now();
        this.reward = [];
        this.loot_boxes = {};
        this.coins = {
            "coins_per_week": 0,
            "coins_total": 0
        }
    }
}