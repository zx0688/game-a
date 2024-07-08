import { Reward } from "../schema/user.schema";
import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";
export declare class UserCreateDto {
    uid: string;
    coins: any;
    level: number;
    stars: number;
    timestamp_recovery: number;
    loot_boxes: any;
    quest_completed: string[];
    reward: Reward[];
    username: string;
    photo_url: string;
    constructor(data: WebAppUserDto);
}
