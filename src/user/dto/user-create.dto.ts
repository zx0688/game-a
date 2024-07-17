import { Types } from "mongoose";
import { Coins, Item } from "../schema/user.schema";
import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";

export class UserCreateDto {
    uid: string;
    user: WebAppUserDto;
    coins: Coins;
    level: number = 1;
    stars: number = 0;
    energy: number;
    loot_boxes: any;
    quest_completed: string[];
    items: Item[];

    constructor(data: WebAppUserDto) {
        this.uid = data.id.toString();
        this.energy = 100;
        this.user = data;
        this.items = [];
        this.loot_boxes = {};
        this.quest_completed = [];
        this.coins = new Coins();
        this.coins.coins_total = 0;
        this.coins.coins_week = 0;
    }
}