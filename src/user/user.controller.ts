import { Controller, Get, Param, Request, UnauthorizedException, Query, ParseArrayPipe, Body, HttpStatus, HttpException, ValidationPipe, UsePipes, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { GameDataInstance } from './dto/game-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto, WebAppInitDataDto } from 'src/auth/dto/authorize-user-dto';
import { ActionService } from 'src/action/action.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('profile')
export class UserController {

    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache,
        private userService: UserService,
        private authService: AuthService,
        private actionService: ActionService) { }

    @Get('get')
    async getProfile(@Body() authorizationData: WebAppInitDataDto) {

        const token = this.authService.authorization(authorizationData);

        const uid = token.uid;
        const user = await this.userService.getByUidOrCreate(authorizationData.user);
        const timestamp_week = this.userService.getTimestampNextWeek();
        //const friends = uids ? await this.userService.getFriends(uids, timestamp_week) : [];
        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "user": user,
            "data": GameDataInstance,
            "timestampNextWeek": timestamp_week,
            "leaderboard": leaderboard,
            "token": token
        };

        return response;
    }

    @Get("items")
    async getItems(@Body() token: TokenDto) {

        this.authService.checkHash(token);

        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new HttpException("user not found!", HttpStatus.EXPECTATION_FAILED);
        return user.reward;
    }


    @Get("friends")
    async getFriendProfiles(
        @Query('uids', new ParseArrayPipe({ items: String, separator: ',' })) uids: string[],
        @Body() token: TokenDto) {

        this.authService.checkHash(token);
        const uid = token.uid;

        if (!uids)
            throw new Error("Error: uids is empty!")

        const leaderboard = await this.cache.get('leaderboard');
        let response = {
            "timestamp": Date.now(),
            "leaderboard": leaderboard,
            "friends": await this.userService.getFriends(uids, this.userService.getTimestampNextWeek())
        };

        return response;
    }

}
