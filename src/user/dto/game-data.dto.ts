
export class GameDataDto {
    readonly starPrices = starPrices;
    readonly referral = referral;
    readonly referralBonus = referralBonus;
    readonly quests = viralQuestReward;

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

//монеты награда за выполнение квеста
const viralQuestReward =
{
    "3423324": 150,
    "543354": 200
};

export const GameDataInstance = new GameDataDto();