import { Controller, Get, Query, Param, Post, ParseArrayPipe, Request, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ActionService } from './action.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserDocument } from 'src/user/schema/user.schema';
import { time } from 'console';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ActionResponseDto } from './dto/action-response.dto';

@Controller('action')
export class ActionController {

    constructor(
        private userService: UserService,
        private actionService: ActionService,
        private authService: AuthService) { }

    @Post("energy")
    @ApiOperation({ summary: 'Энергия' })
    @ApiResponse({
        status: 200,
        type: ActionResponseDto
    })
    @ApiParam({
        name: 'value',
        required: true,
        description: 'Значение монет для добавления'
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    async energy(
        @Query("value") value: string,
        @Body() token: TokenDto) {
        this.authService.checkHash(token);
        const timestamp = Date.now();
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await this.actionService.energy(user, value);
        return new ActionResponseDto({
            timestamp: timestamp,
            updated: update
        });
    }

    @Post("levelup")
    @ApiOperation({ summary: 'Покупка уровня за монеты' })
    @ApiResponse({
        status: 200,
        type: ActionResponseDto
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    async levelup(@Body() token: TokenDto) {

        this.authService.checkHash(token);
        const timestamp = Date.now();
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await this.actionService.levelup(user);
        return new ActionResponseDto({
            timestamp: timestamp,
            updated: update
        });
    }

    @Post("collect")
    @ApiOperation({ summary: 'Сбор монет. Запрос отправляется каждый раз при сборе монет, требует игровой токен который выдается profile/get' })
    @ApiResponse({
        status: 200,
        type: ActionResponseDto
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    @ApiParam({
        name: 'value',
        required: true,
        description: 'Значение монет для добавления'
    })
    async collect(
        @Query("value") value: string,
        @Body() token: TokenDto) {

        this.authService.checkHash(token);
        const timestamp = Date.now();
        const uid = token.uid;
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await this.actionService.collect(user, value);
        return new ActionResponseDto({
            timestamp: timestamp,
            updated: update
        });
    }

    @Post("quest")
    @ApiOperation({ summary: 'Выполнить задание. Требует игровой токен от profile/get. Отправить этот запрос при просмотре рекламы или любого другого задания. Задание можно выполнить только один раз. Если у задания есть награда, она добавляется в список ожидающих. Запрос ожидающих наград profile/items. Подтверждение награды action/accept' })
    @ApiResponse({
        status: 200,
        type: ActionResponseDto
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'id задания'
    })
    async quest(
        @Query("id") id: string,
        @Body() token: TokenDto) {

        this.authService.checkHash(token);
        const response = await this.handleAction(token.uid, user => this.actionService.quest(user, id));
        return new ActionResponseDto(response);
    }

    @Post("accept")
    @ApiOperation({ summary: 'Получить ожидающую награду или товар. Требует игровой токен полученный profile/get. После выполнения ордера или задания, награда добавляется в список наград, которые необходимо получить этим методом' })
    @ApiResponse({
        status: 200,
        type: ActionResponseDto
    })
    @ApiBody({
        description: 'Токен для запросов на бекенд',
        required: true,
        type: TokenDto
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'id задания'
    })
    async accept(
        @Query("id") id: string,
        @Body() token: TokenDto) {

        this.authService.checkHash(token);
        return await this.handleAction(token.uid, user => this.actionService.accept(user, id));
    }

    async handleAction(uid: string, updateFunction: (user: any) => Promise<any>): Promise<any> {
        const timestamp = Date.now();
        const user = await this.userService.getByUid(uid);
        if (!user)
            throw new Error(`Error: User ${uid} is not found!`);
        user.timestamp = timestamp;
        const update = await updateFunction(user);
        let response = {
            "timestamp": timestamp,
            "updated": update
        };
        return response;
    }


}
