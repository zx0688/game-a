import { ApiProperty } from "@nestjs/swagger";

export class WebAppUserDto {
    @ApiProperty({
        default: "296065026",
    })
    id: number;
    @ApiProperty({
        default: "Evgenii",
    })
    first_name: string;
    @ApiProperty({
        default: "Kutepov",
    })
    last_name?: string;
    @ApiProperty({
        default: "Evgeny_Kutepov",
    })
    username?: string;
    @ApiProperty()
    language_code?: string;
    @ApiProperty()
    allows_write_to_pm?: boolean;
}

export class LoginDto {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}
export class TokenDto {
    @ApiProperty({
        default: "26541fcd09f7b89b76db07313ee15a663f8639f6b1aec64e6053994befc7efc1",
        description: "хеш запросов на бек"
    })
    hash: string;
    @ApiProperty({
        default: "234324324",
        description: "id игрока на платформе"
    })
    uid: string;
    @ApiProperty({
        default: 173243243,
        description: "истечение токен"
    })
    expire: number;
}

export class WebAppInitDataDto {
    @ApiProperty({
        default: "AAECmKURAAAAAAKYpRHolqmy",
    })
    query_id?: string;

    @ApiProperty()
    user?: WebAppUserDto;

    @ApiProperty({
        default: "1720557663",
    })
    auth_date: string;
    @ApiProperty({
        default: "26541fcd09f7b89b76db07313ee15a663f8639f6b1aec64e6053994befc7efc1",
    })
    hash: string;
}