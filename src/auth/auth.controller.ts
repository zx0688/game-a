import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiOperation({ summary: 'Запрос авторизации на игровом сервере, например, если срок игрового токена истек. Profile/Get выдает токен после успешной авторизации в Telegram. С этим токеном нужно делать запросы на игровой сервер. Если токен истек его нужно перезапрашивать этим методом' })
    @ApiResponse({
        status: 200,
        type: TokenDto,
    })
    @ApiParam({
        name: 'authorizationData',
        required: true,
        description: 'WebAppInitData'
    })
    async auth(@Body() authorizationData: WebAppInitDataDto) {
        return this.authService.authorization(authorizationData);
    }
}
