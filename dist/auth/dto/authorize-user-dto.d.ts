export declare class WebAppUserDto {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
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
    receiver?: WebAppUserDto;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
}
