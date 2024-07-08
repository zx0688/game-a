import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare enum ActionCommand {
    COLLECT = "collect",
    QUEST = "quest",
    ACCEPT = "accept"
}
export declare class ActionService {
    private userService;
    constructor(userService: UserService);
    applyCommand(user: UserDocument, command: string, value: string): Promise<any>;
    private addCoins;
}
