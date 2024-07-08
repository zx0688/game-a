import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto, WebAppInitDataDto } from 'src/auth/dto/authorize-user-dto';
import { ActionService } from 'src/action/action.service';
import { Cache } from 'cache-manager';
export declare class UserController {
    private cache;
    private userService;
    private authService;
    private actionService;
    constructor(cache: Cache, userService: UserService, authService: AuthService, actionService: ActionService);
    getProfile(authorizationData: WebAppInitDataDto): Promise<{
        timestamp: number;
        user: User;
        data: import("./dto/game-data.dto").GameDataDto;
        timestampNextWeek: number;
        leaderboard: unknown;
        token: TokenDto;
    }>;
    getItems(token: TokenDto): Promise<import("./schema/user.schema").Reward[]>;
    getFriendProfiles(uids: string[], token: TokenDto): Promise<{
        timestamp: number;
        leaderboard: unknown;
        friends: any[];
    }>;
}
