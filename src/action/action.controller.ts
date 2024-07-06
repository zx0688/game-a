import { Controller, Get, Query, Param, Post, ParseArrayPipe, Request, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ActionService } from './action.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';

@Controller('action')
export class ActionController {

    constructor(
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

        let response = {
            "timestamp": Date.now(),
            "updated": await this.actionService.applyCommand(user, command, value)
        };

        return response;
    }

}
