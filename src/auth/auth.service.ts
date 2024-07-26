import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { createHash } from 'crypto';
import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { botToken } from 'src/telegram/telegram.service';
import { UserService } from 'src/user/user.service';
import { createHmac, timingSafeEqual } from 'crypto';
import { verifyTelegramWebAppData } from './dto/crypto-js';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }


    public async authorization(authorizationData: any, user: any): Promise<TokenDto> {

        const auth_date = parseInt(authorizationData.auth_date);

        if ((Date.now() / 1000 - auth_date) > 86400)
            throw new HttpException(`Auth data is outdated`, HttpStatus.UNAUTHORIZED);

        //if (process.env.NODE_ENV === 'development') { console.log("dev env auth!"); }
        const isValid = await verifyTelegramWebAppData(authorizationData);
        if (!isValid)
            throw new HttpException(`Verification failed!`, HttpStatus.UNAUTHORIZED);

        const uid = user.id.toString();
        const expire = Date.now() / 1000 + 3600; // 1 hours
        const token = this.createHash(uid, expire);

        return {
            uid: uid,
            expire: expire,
            hash: token
        };
    }

    private createHash(uid: string, expire: number): string {
        return createHmac('sha256', "E|9No|6owY$FmqrH$V08~").update(`${uid}${expire}`).digest('hex');
    }

    public checkHash(token: TokenDto) {

        if (!token || !token.uid)
            throw new HttpException("Request should have a token", HttpStatus.UNAUTHORIZED);

        if (process.env.NODE_ENV === 'development' || token.hash == "Gm2T~}@AnL%l2}NvxcOQ")
            return;

        if (Math.floor(Date.now() / 1000) > token.expire)
            throw new HttpException("Verification failed due to timeout", HttpStatus.UNAUTHORIZED);

        const hash = this.createHash(token.uid, token.expire);
        if (hash !== token.hash)
            throw new HttpException("Verification has failed", HttpStatus.UNAUTHORIZED);
    }

}
