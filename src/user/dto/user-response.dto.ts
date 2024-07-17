import { TokenDto, WebAppUserDto } from "src/auth/dto/authorize-user-dto";
import { Coins, User } from "../schema/user.schema"
import { GameDataDto } from "./game-data.dto"
import { ApiProperty } from "@nestjs/swagger";

export class LeaderBoardDto {
    @ApiProperty({
        description: "топ пользователи с общим количеством монет",
        default: []
    })
    top_total: UserLeaderDto[];
    @ApiProperty({
        description: "все пользователи с общим количеством монет",
        default: []
    })
    total: string[];

    @ApiProperty({
        description: "топ пользователей за неделю",
        default: []
    })
    top_week: UserLeaderDto[];
    @ApiProperty({
        description: "топ пользователей за неделю",
        default: []
    })
    week: string[];
    constructor(partial: Partial<LeaderBoardDto>) {
        Object.assign(this, partial);
    }
};

export class UserLeaderDto {
    @ApiProperty({
        description: "профиль на платформе",
    })
    user: WebAppUserDto;
    @ApiProperty({
        description: "монеты пользоватля",
    })
    coins: Coins;
    constructor(partial: Partial<UserLeaderDto>) {
        Object.assign(this, partial);
    }
};


export class ProfileResponseDto {
    @ApiProperty({
        default: 1231234124,
        description: "временная метка"
    })
    timestamp: number;
    @ApiProperty({
        description: "игровой профиль"
    })
    user: User;
    @ApiProperty({
        description: "игровые данные"
    })
    data: GameDataDto;
    @ApiProperty({
        default: 1231234124,
        description: "временная метка следующей недели"
    })
    timestampNextWeek: number;

    @ApiProperty({
        description: "таблица лидеров"
    })
    leaderboard: any;

    @ApiProperty({
        description: "игровой токен"
    })
    token: TokenDto;

    constructor(partial: Partial<ProfileResponseDto>) {
        Object.assign(this, partial);
    }
}

