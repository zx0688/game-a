import { Model } from 'mongoose';
import { Coins, Item, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare enum ActionCommand {
    COLLECT = "collect",
    QUEST = "quest",
    ACCEPT = "accept"
}
export declare class ActionService {
    private userService;
    private userModel;
    constructor(userService: UserService, userModel: Model<UserDocument>);
    energy(user: UserDocument, value: string): Promise<number>;
    collect(user: UserDocument, value: string): Promise<Coins>;
    levelup(user: UserDocument): Promise<UserDocument>;
    accept(user: UserDocument, value: string): Promise<Item[]>;
    quest(user: UserDocument, value: string): Promise<Item[]>;
    private addCoins;
}
