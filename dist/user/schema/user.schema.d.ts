import mongoose, { HydratedDocument } from 'mongoose';
import { WebAppUserDto } from 'src/auth/dto/authorize-user-dto';
export type UserDocument = HydratedDocument<User>;
export declare class Coins {
    coins_total: number;
    coins_week: number;
}
export declare class Item {
    id: string;
    coins?: number;
    level?: number;
    stars?: number;
    constructor(partial?: Partial<Item>);
}
export declare class User {
    uid: string;
    user: WebAppUserDto;
    coins: Coins;
    level: number;
    energy: number;
    stars: number;
    loot_boxes: any;
    quest_completed: string[];
    timestamp: number;
    items: Item[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
