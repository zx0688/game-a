import { Injectable } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { AxiosResponse } from 'axios'
import { botToken, externalDomain } from './app.module';
import { HttpModule, HttpService } from '@nestjs/axios';



@Injectable()
export class AppService {

    constructor(private httpService: HttpService) { }

    setWebhook(): Observable<any> {
        const url = `https://api.telegram.org/bot${botToken}/setWebhook`;
        const body = {
            "url": `https://${externalDomain}/profile/webhook`,
            "allowed_updates": ['invoice', 'successful_payment']
        };
        console.log(`set webhook ${url}`);
        return this.httpService.post(url, body).pipe(
            map(response => {
                if (response.data.ok) {
                    return response.data;
                } else {
                    throw new Error('Webhook setup failed');
                }
            })
        );
    }
}
