import { ApiProperty } from "@nestjs/swagger";
import { Item } from "../schema/user.schema";

export class GameDataDto {
    @ApiProperty({
        description: "продажа звез за уровень"
    })
    readonly levelStars = levelStars;

    @ApiProperty({
        description: "рефералы"
    })
    readonly referral = referral;
    @ApiProperty({
        description: "бонусы за реферал"
    })
    readonly referralBonus = referralBonus;
    @ApiProperty({
        description: "задания"
    })
    readonly quests = questReward;

    readonly levelCost: number = 30;

}


const levelStars = {
    "50": 9,
    "75": 18,
    "100": 27,
    "150": 36,
    "250": 45,
    "350": 54,
    "500": 63,
    "750": 72,
    "1000": 81,
    "1500": 89,
    "2500": 99
};

const referral =
{
    "1": 343,           //cost/level
    "2": 543,
    "3": 23
};

const referralBonus =
{
    "1": 15              //bonus per level
};

//монеты награда за выполнение квеста
const questReward =
{
    "login": { coins: 234 },
    "543354": { coins: 33 }
};

export const GameDataInstance = new GameDataDto();