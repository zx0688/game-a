import { ApiProperty } from "@nestjs/swagger";
import { LeaderBoardDto } from "src/user/dto/user-response.dto";

export class ActionResponseDto {
    @ApiProperty({
        description: "текущее время на беке",
        default: 2343432442
    })
    timestamp: number;
    @ApiProperty({
        description: "произведенные изменения профиля",
    })
    updated: any;

    constructor(partial: Partial<ActionResponseDto>) {
        Object.assign(this, partial);
    }
};
