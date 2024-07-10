import { ApiProperty } from "@nestjs/swagger";
import { WebAppUserDto } from "src/auth/dto/authorize-user-dto";
import { User } from "src/user/schema/user.schema";


export class InvoiceDto {
    title: string;
}

export class PreCheckoutQuery {
    id: string;
    from: WebAppUserDto;
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
    from?: WebAppUserDto;
    invoice?: InvoiceDto;
    successful_payment?: SuccessPaymentDto;
}

export class UpdateDto {
    @ApiProperty({
        description: "айди сообщения",
        default: 234
    })
    update_id: number;
    @ApiProperty({
        description: "тело сообщения",
    })
    message: MessageDto;
    @ApiProperty({
        description: "проверка готовности совершить платеж",
    })
    pre_checkout_query: PreCheckoutQuery;
}