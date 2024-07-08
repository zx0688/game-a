import { UserService } from 'src/user/user.service';
import { ActionService } from './action.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';
import { Cache } from 'cache-manager';
export declare class ActionController {
    private cache;
    private userService;
    private actionService;
    private authService;
    constructor(cache: Cache, userService: UserService, actionService: ActionService, authService: AuthService);
    update(command: string, value: string, status: string, token: TokenDto): Promise<{
        timestamp: number;
        leaderboard: unknown;
        updated: any;
    }>;
}
