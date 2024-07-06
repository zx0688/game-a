import { Body, Controller, Get } from '@nestjs/common';
import { WebAppInitDataDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    async auth(@Body() authorizationData: WebAppInitDataDto) {
        return this.authService.authorization(authorizationData);
    }
}
