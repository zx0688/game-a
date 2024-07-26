import { TokenDto } from './dto/authorize-user-dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    auth(request: Request): Promise<TokenDto>;
}
