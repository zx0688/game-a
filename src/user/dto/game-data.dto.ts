import { ApiProperty } from "@nestjs/swagger";

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
    readonly quests = viralQuestReward;

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
const viralQuestReward =
{
    "3423324": 150,
    "543354": 200
};

export const GameDataInstance = new GameDataDto();