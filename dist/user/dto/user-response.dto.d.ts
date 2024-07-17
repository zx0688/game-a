import { TokenDto, WebAppUserDto } from "src/auth/dto/authorize-user-dto";
import { Coins, User } from "../schema/user.schema";
import { GameDataDto } from "./game-data.dto";
export declare class LeaderBoardDto {
    top_total: UserLeaderDto[];
    total: string[];
    top_week: UserLeaderDto[];
    week: string[];
    constructor(partial: Partial<LeaderBoardDto>);
}
export declare class UserLeaderDto {
    user: WebAppUserDto;
    coins: Coins;
    constructor(partial: Partial<UserLeaderDto>);
}
export declare class ProfileResponseDto {
    timestamp: number;
    user: User;
    data: GameDataDto;
    timestampNextWeek: number;
    leaderboard: any;
    token: TokenDto;
    constructor(partial: Partial<ProfileResponseDto>);
}
