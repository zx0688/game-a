import { User } from "src/user/schema/user.schema";

export class UserDto {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

export class InvoiceDto {
    title: string;
}

export class PreCheckoutQuery {
    id: string;
    from: UserDto;
    currency: string;
    total_amount: number;
    invoice_payload: string;
}

export class SuccessPaymentDto {
    invoice_payload: string;
    telegram_payment_charge_id: string;
    total_amount: number;
}
export class MessageDto {
    message_id: number;
    from?: UserDto;
    invoice?: InvoiceDto;
    successful_payment?: SuccessPaymentDto;
}

export class UpdateDto {
    update_id: number;
    message: MessageDto;
    pre_checkout_query: PreCheckoutQuery;
}