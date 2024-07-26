import { Controller, Get, Param, UnauthorizedException, Query, ParseArrayPipe, Body, HttpStatus, HttpException, ValidationPipe, UsePipes, Inject, Post, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
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

    @Get("get")
    @ApiOperation({
        summary: "Получение профиля юзера. Запрашивается один раз в начале игровой сессии. В теле запроса объект Telegram WebAppInitData. Если профиля нет, он создается. Возвращает Игровой объект User, содержащий количество монет, уровень, звезды. Возвращает игровые данные, стоимость звез на уровень, лоты (товары). Возвращает время следующей недели и таблицу лидеров."
    })
    @ApiResponse({
        status: 200,
        type: ProfileResponseDto
    })
    @ApiParam({
        name: 'query',
        required: true,
        description: 'WebAppInitData'
    })
    async getProfile(
        @Req() request: Request
    ) {
        const user = JSON.parse(request.query.user as string);
        const token = await this.authService.authorization(request.query, user);
        if (!token)
            throw new HttpException("Unauth user!", HttpStatus.UNAUTHORIZED);

        const userobj = await this.userService.getByUidOrCreate(user);
        const timestamp_next_week = this.userService.getTimestampNextWeek();
        const leaderboard = UserService.LeaderBoard;
        const l = {
            total: leaderboard.top_total,
            week: leaderboard.top_week,
            total_user: leaderboard.total.indexOf(token.uid) + 1,
            week_user: leaderboard.week.indexOf(token.uid) + 1
        };

        const resp = new ProfileResponseDto({
            "timestamp": Date.now(),
            "user": userobj,
            "data": GameDataInstance,
            "timestampNextWeek": timestamp_next_week,
            "leaderboard": l,
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

    @Post("leaderboard")
    @ApiOperation({ summary: 'получение списка лидеров' })
    @ApiResponse({
        status: 200,
        type: [Item]
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    async getLeaderboard(@Body() token: TokenDto) {
        this.authService.checkHash(token);
        const leaderboard: LeaderBoardDto = UserService.LeaderBoard;//await this.cache.get('leaderboard');
        return {
            total: leaderboard.top_total,
            week: leaderboard.top_week,
            total_user: leaderboard.total.indexOf(token.uid) + 1,
            week_user: leaderboard.week.indexOf(token.uid) + 1
        };
    }

    @Cron(CronExpression.EVERY_MINUTE)
    @ApiOperation({ summary: 'Обновление таблицы лидеров по расписанию, раз в 2 часа' })
    async updateLeaderboard(): Promise<void> {
        Logger.log("Обновление таблицы лидеров");
        this.userService.createTimestampNextWeek();
        const leaderboard = await this.userService.createLeaderBoard();
        UserService.LeaderBoard = leaderboard;
        //
        Logger.log("Обновление таблицы лидеров завершено");
        return;
    }


}
