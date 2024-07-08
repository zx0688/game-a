import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
export declare class LeaderboardController {
    private cache;
    private userService;
    constructor(cache: Cache, userService: UserService);
    updateLeaderboard(): Promise<void>;
}
