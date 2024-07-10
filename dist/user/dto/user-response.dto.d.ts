import { TokenDto } from "src/auth/dto/authorize-user-dto";
import { Coins, User } from "../schema/user.schema";
import { GameDataDto } from "./game-data.dto";
export declare class LeaderBoardDto {
    total: UserLeaderDto[];
    week: UserLeaderDto[];
}
export declare class UserLeaderDto {
    user: User;
    coins: Coins;
}
export declare class ProfileResponseDto {
    timestamp: number;
    user: User;
    data: GameDataDto;
    timestampNextWeek: number;
    leaderboard: LeaderBoardDto;
    token: TokenDto;
    constructor(partial: Partial<ProfileResponseDto>);
}
