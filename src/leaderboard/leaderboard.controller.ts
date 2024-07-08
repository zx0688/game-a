import { Controller, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache, private userService: UserService) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async updateLeaderboard(): Promise<void> {
        const leaderboard = await this.userService.createLeaderBoard();
        await this.cache.set('leaderboard', leaderboard);
        return;
    }

}
