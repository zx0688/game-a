import { Controller, Get, Request } from '@nestjs/common';
import { GameDataDto } from './dto/game-data.dto';
import { UserService } from 'src/user/user.service';

@Controller('data')
export class GameDataController {

    constructor(private readonly userService: UserService) { }

    @Get()
    getData(@Request() req: Request) {
        this.userService.authorization(req)
        return GameDataDto.getInstance();
    }
}
