export declare class WebAppUserDto {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
}
export declare class LoginDto {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}
export declare class TokenDto {
    hash: string;
    uid: string;
    expire: number;
}
export declare class WebAppInitDataDto {
    query_id?: string;
    user?: WebAppUserDto;
    auth_date: string;
    hash: string;
}
