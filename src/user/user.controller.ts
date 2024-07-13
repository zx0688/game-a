import { Controller, Get, Param, Request, UnauthorizedException, Query, ParseArrayPipe, Body, HttpStatus, HttpException, ValidationPipe, UsePipes, Inject, Post, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Item, User } from './schema/user.schema';
import { GameDataInstance } from './dto/game-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto, WebAppInitDataDto } from 'src/auth/dto/authorize-user-dto';
import { ActionService } from 'src/action/action.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LeaderBoardDto, ProfileResponseDto } from './dto/user-response.dto';

@Controller('profile')
export class UserController {

    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache,
        private userService: UserService,
        private authService: AuthService,
        private actionService: ActionService) { }

    @Post("get")
    @ApiOperation({
        summary: "Получение профиля юзера. Запрашивается один раз в начале игровой сессии. В теле запроса объект Telegram WebAppInitData. Если профиля нет, он создается. Возвращает Игровой объект User, содержащий количество монет, уровень, звезды. Возвращает игровые данные, стоимость звез на уровень, лоты (товары). Возвращает время следующей недели и таблицу лидеров."
    })
    @ApiResponse({
        status: 200,
        type: ProfileResponseDto
    })
    @ApiParam({
        name: 'authorizationData',
        required: true,
        description: 'WebAppInitData'
    })
    async getProfile(@Body() authorizationData: WebAppInitDataDto) {

        const token = this.authService.authorization(authorizationData);

        if (!token)
            throw new HttpException("Unauth user!", HttpStatus.UNAUTHORIZED);

        const user = await this.userService.getByUidOrCreate(authorizationData.user);
        const timestamp_next_week = this.userService.getTimestampNextWeek();
        const leaderboard = await this.cache.get('leaderboard');
        Logger.log(leaderboard);
        const resp = new ProfileResponseDto({
            "timestamp": Date.now(),
            "user": user,
            "data": GameDataInstance,
            "timestampNextWeek": timestamp_next_week,
            "leaderboard": leaderboard as LeaderBoardDto,
            "token": token
        });
        return resp;
    }

    @Post("items")
    @ApiOperation({ summary: 'Получение списка наград пользователя. Для запроса нужен игровой токен от profile/get. Все неподтвержденые награды и покупки. Для фактического начисления награды на счет необходимо вызывать метод Accept. Последовательность запросов такая: 1. Покупка (просмотр рекламы) 2. Вызов этого запроса по успешному колбеку 3. Подтверждение награды методом Accept - здесь уже можно показать анимацию выдачи' })
    @ApiResponse({
        status: 200,
        type: [Item]
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    async getItems(@Body() token: TokenDto) {

        this.authService.checkHash(token);

        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new HttpException("user not found!", HttpStatus.EXPECTATION_FAILED);
        return user.items;
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    @ApiOperation({ summary: 'Обновление таблицы лидеров по расписанию, раз в 2 часа' })
    async updateLeaderboard(): Promise<void> {
        this.userService.createTimestampNextWeek();
        const leaderboard = await this.userService.createLeaderBoard();
        await this.cache.set('leaderboard', leaderboard, -1);

        return;
    }


}
