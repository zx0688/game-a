import { Controller, Get, Query, Param, Post, ParseArrayPipe, Request, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ActionService } from './action.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('action')
export class ActionController {

    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache,
        private userService: UserService,
        private actionService: ActionService,
        private authService: AuthService) { }

    @Get()
    async update(
        @Query("command") command: string,
        @Query("value") value: string,
        @Query("status") status: string,
        @Body() token: TokenDto) {

        this.authService.checkHash(token);

        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "leaderboard": leaderboard,
            "updated": await this.actionService.applyCommand(user, command, value)
        };

        return response;
    }

}
