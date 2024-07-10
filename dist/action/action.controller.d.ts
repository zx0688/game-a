import { UserService } from 'src/user/user.service';
import { ActionService } from './action.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/authorize-user-dto';
import { Cache } from 'cache-manager';
import { ActionResponseDto } from './dto/action-response.dto';
export declare class ActionController {
    private cache;
    private userService;
    private actionService;
    private authService;
    constructor(cache: Cache, userService: UserService, actionService: ActionService, authService: AuthService);
    collect(value: string, token: TokenDto): Promise<ActionResponseDto>;
    quest(id: string, token: TokenDto): Promise<ActionResponseDto>;
    accept(id: string, token: TokenDto): Promise<any>;
    handleAction(uid: string, updateFunction: (user: any) => Promise<any>): Promise<any>;
}
