import { UserService } from './user.service';
import { Item } from './schema/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto, WebAppInitDataDto } from 'src/auth/dto/authorize-user-dto';
import { ActionService } from 'src/action/action.service';
import { Cache } from 'cache-manager';
import { ProfileResponseDto } from './dto/user-response.dto';
export declare class UserController {
    private cache;
    private userService;
    private authService;
    private actionService;
    constructor(cache: Cache, userService: UserService, authService: AuthService, actionService: ActionService);
    getProfile(authorizationData: WebAppInitDataDto): Promise<ProfileResponseDto>;
    getItems(token: TokenDto): Promise<Item[]>;
    getLeaderboard(token: TokenDto): Promise<{
        total: import("./dto/user-response.dto").UserLeaderDto[];
        week: import("./dto/user-response.dto").UserLeaderDto[];
        total_user: number;
        week_user: number;
    }>;
    updateLeaderboard(): Promise<void>;
}
