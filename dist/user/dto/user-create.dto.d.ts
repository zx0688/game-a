import { Coins, Item } from "../schema/user.schema";
import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";
export declare class UserCreateDto {
    uid: string;
    user: WebAppUserDto;
    coins: Coins;
    level: number;
    stars: number;
    timestamp_recovery: number;
    loot_boxes: any;
    quest_completed: string[];
    items: Item[];
    constructor(data: WebAppUserDto);
}
