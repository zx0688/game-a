import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class Coins {
    coins_total: number;
    coins_week: number;
}
export declare class Reward {
    id: string;
    coins: number;
    level: number;
    stars: string;
    constructor();
}
export declare class User {
    uid: string;
    coins: Coins;
    level: number;
    username: string;
    photo_url: string;
    stars: number;
    timestamp_recovery: number;
    loot_boxes: any;
    quest_completed: string[];
    timestamp: number;
    reward: Reward[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
