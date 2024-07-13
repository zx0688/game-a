export declare class GameDataDto {
    readonly levelStars: {
        "50": number;
        "75": number;
        "100": number;
        "150": number;
        "250": number;
        "350": number;
        "500": number;
        "750": number;
        "1000": number;
        "1500": number;
        "2500": number;
    };
    readonly durationRecovery: Number;
    readonly referral: {
        "1": number;
        "2": number;
        "3": number;
    };
    readonly referralBonus: {
        "1": number;
    };
    readonly quests: {
        login: {
            coins: number;
        };
        "543354": {
            coins: number;
        };
    };
}
export declare const GameDataInstance: GameDataDto;
