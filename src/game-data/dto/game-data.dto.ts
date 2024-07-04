export class GameDataDto {
    readonly starPrices = starPrices;
    readonly referral = referral;
    readonly referralBonus = referralBonus;
    readonly viralQuestReward = viralQuestReward;

    static getInstance(): GameDataDto {
        return new GameDataDto();
    }
}
const starPrices = {
    "9": {
        "50": 34
    },
    "75": {
        "34": 553
    }
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

const viralQuestReward =
{
    "3423324": 150,     //quest id/coins reward
    "543354": 200
};

