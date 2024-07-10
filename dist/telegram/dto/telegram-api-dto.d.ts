import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";
export declare class InvoiceDto {
    title: string;
}
export declare class PreCheckoutQuery {
    id: string;
    from: WebAppUserDto;
    currency: string;
    total_amount: number;
    invoice_payload: string;
}
export declare class SuccessPaymentDto {
    invoice_payload: string;
    telegram_payment_charge_id: string;
    total_amount: number;
}
export declare class MessageDto {
    message_id: number;
    from?: WebAppUserDto;
    invoice?: InvoiceDto;
    successful_payment?: SuccessPaymentDto;
}
export declare class UpdateDto {
    update_id: number;
    message: MessageDto;
    pre_checkout_query: PreCheckoutQuery;
}
