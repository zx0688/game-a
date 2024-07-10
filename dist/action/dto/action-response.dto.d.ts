import { LeaderBoardDto } from "src/user/dto/user-response.dto";
export declare class ActionResponseDto {
    timestamp: number;
    leaderboard: LeaderBoardDto;
    updated: any;
    constructor(partial: Partial<ActionResponseDto>);
}
