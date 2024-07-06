import { Controller, Get, Param, Request, UnauthorizedException, Query, ParseArrayPipe, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { GameDataInstance } from './dto/game-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';
import { ActionService } from 'src/action/action.service';

@Controller('profile')
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private actionService: ActionService) { }


    @Get("webhook")
    async payment(
        @Body() data: any) {

        switch (data) {
            case "invoke":
                return data;
            case "success_payment":


                return data;
        }
        return { "ok": false };
    }

    @Get()
    async getProfile(
        @Query('uids', new ParseArrayPipe({ items: String, separator: ',' })) uids: string[],
        @Body() token: TokenDto) {

        this.authService.checkHash(token);

        const uid = token.uid;
        const user = await this.userService.getByUidOrCreate(uid);
        const timestamp_week = this.userService.getTimestampNextWeek();
        const friends = uids ? await this.userService.getFriends(uids, timestamp_week) : [];

        let response = {
            "timestamp": Date.now(),
            "user": user,
            "data": GameDataInstance,
            "timestampNextWeek": timestamp_week,
            "friends": friends
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
        return await this.actionService.createItemPayment(user, {});;
    }


    @Get("friends")
    async getFriendProfiles(
        @Query('uids', new ParseArrayPipe({ items: String, separator: ',' })) uids: string[],
        @Body() token: TokenDto) {

        this.authService.checkHash(token);
        const uid = token.uid;

        if (!uids)
            throw new Error("Error: uids is empty!")

        let response = {
            "timestamp": Date.now(),
            "friends": await this.userService.getFriends(uids, this.userService.getTimestampNextWeek())
        };

        return response;
    }

}
