import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
export declare class AuthService {
    authorization(authorizationData: WebAppInitDataDto): TokenDto;
    private createHash;
    checkHash(token: TokenDto): {
        message: string;
    };
}
