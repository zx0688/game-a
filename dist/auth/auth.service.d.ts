import { TokenDto } from './dto/authorize-user-dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    authorization(authorizationData: any, user: any): Promise<TokenDto>;
    private createHash;
    checkHash(token: TokenDto): void;
}
