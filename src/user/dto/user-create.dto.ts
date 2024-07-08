import { Types } from "mongoose";
import { Reward } from "../schema/user.schema";
import { UserDto } from "src/telegram/dto/telegram-api-dto";
import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";

export class UserCreateDto {
    uid: string;
    coins: any;
    level: number = 1;
    stars: number = 0;
    timestamp_recovery: number;
    loot_boxes: any;
    quest_completed: string[];
    reward: Reward[];
    username: string;
    photo_url: string;

    constructor(data: WebAppUserDto) {
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
        }
    }
}