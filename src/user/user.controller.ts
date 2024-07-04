import { Controller, Get, Param, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('profile')
export class UserController {

    constructor(private userService: UserService) { }

    @Get(':uid')
    async getProfile(@Param('uid') uid: string, @Param('friends') friends: string[], @Request() req: Request) {

        this.userService.authorization(req);
        const user = await this.userService.getByUidOrCreate(uid);

        const leaderBoard = friends ? await this.userService.getLeaderBoard(friends) : [];

        let response = {
            "timestamp": Date.now(),
            "user": user,
            "timestampNextWeek": this.userService.getTimestampNextWeek(),
            "leaderBoard": leaderBoard
        };

        return response;
    }


}
