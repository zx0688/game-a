import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    auth(authorizationData: WebAppInitDataDto): Promise<TokenDto>;
}
