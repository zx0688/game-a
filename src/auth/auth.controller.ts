import { Body, Controller, Get } from '@nestjs/common';
import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    @ApiOperation({ summary: 'Запрос авторизации на игровом сервере, например, если срок токен истек' })
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
