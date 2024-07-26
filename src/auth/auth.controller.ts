import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    @ApiOperation({ summary: 'Запрос авторизации на игровом сервере, например, если срок игрового токена истек. Profile/Get выдает токен после успешной авторизации в Telegram. С этим токеном нужно делать запросы на игровой сервер. Если токен истек его нужно перезапрашивать этим методом' })
    @ApiResponse({
        status: 200,
        type: TokenDto,
    })
    @ApiParam({
        name: 'query',
        required: true,
        description: 'WebAppInitData'
    })
    async auth(@Req() request: Request) {
        const user = JSON.parse(request.query.user as string);
        return await this.authService.authorization(request.query, user);
    }
}
