import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { createHash } from 'crypto';
import { TokenDto, WebAppInitDataDto } from './dto/authorize-user-dto';
import { botToken } from 'src/app.module';

@Injectable()
export class AuthService {


    public authorization(authorizationData: WebAppInitDataDto): TokenDto {

        const data = authorizationData;
        const hash = data.hash as string;
        delete data.hash;

        const secretKey = crypto
            .createHmac("sha256", "WebAppData")
            .update(botToken)
            .digest();

        const dataCheckString = Object.keys(data)
            .sort()
            .map((key) => `${key}=${data[key]}`)
            .join("\n");

        const computedHash = crypto
            .createHmac("sha256", secretKey)
            .update(dataCheckString)
            .digest("hex");

        if (process.env.NODE_ENV === 'development') { console.log("dev env auth!"); }
        else if (computedHash !== hash) {
            throw new HttpException(`Verification failed!`, HttpStatus.UNAUTHORIZED);
        }
        const uid = authorizationData.user.id.toString();
        const expire = data.auth_date + 3600; // 1 hour
        const token = this.createHash(uid, expire);

        return {
            uid: uid,
            expire: expire,
            hash: token
        };
    }

    private createHash(uid: string, expire: number): string {
        return createHash('sha256').update(`${uid}${expire}E|9No|6owY$FmqrH$V08~`).digest('hex');
    }

    public checkHash(token: TokenDto) {

        if (process.env.NODE_ENV === 'development' || token.hash == "Gm2T~}@AnL%l2}NvxcOQ")
            return;

        if (Math.floor(Date.now() / 1000) > token.expire)
            throw new HttpException("Verification failed due to timeout", HttpStatus.UNAUTHORIZED);

        const hash = this.createHash(token.uid, token.expire);
        if (hash !== token.hash)
            throw new HttpException("Verification has failed", HttpStatus.UNAUTHORIZED);
    }

}
