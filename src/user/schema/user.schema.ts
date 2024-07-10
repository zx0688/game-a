import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types, Document, ObjectId } from 'mongoose';
import { WebAppUserDto } from 'src/auth/dto/authorize-user-dto';

export type UserDocument = HydratedDocument<User>;



export class Coins {
    @ApiProperty({
        description: "общее количество монет",
        default: 12
    })
    coins_total: number;
    @ApiProperty({
        description: "Количество монет собранных за неделю",
        default: 12
    })
    coins_week: number;
}

@Schema()
export class Item {
    @ApiProperty({
        description: "id Не выданная награда",
        default: "1"
    })
    id: string;
    @ApiProperty({
        description: "монет в награде",
    })
    coins?: number;
    @ApiProperty({
        description: "уровней в награде",
    })
    level?: number;
    @ApiProperty({
        description: "звезд в награде",
    })
    stars?: number;
    constructor() {
        this.id = new mongoose.Types.ObjectId().toString();
    }
}


@Schema()
export class User {
    @ApiProperty({
        description: "id игрока в телеграмме",
        default: "1"
    })
    @Prop({ required: true, unique: true })
    uid: string;

    @ApiProperty({
        description: "профиль на платформе"
    })
    @Prop({ required: true, type: WebAppUserDto })
    user: WebAppUserDto;

    @ApiProperty({
        description: "количество монет",
        default: 2
    })
    @Prop({ type: Coins })
    coins: Coins;

    @ApiProperty({
        description: "уровнь",
        default: 1
    })
    @Prop({ type: Number })
    level: number;

    @ApiProperty({
        description: "количество звезд",
        default: 1
    })
    @Prop({ type: Number })
    stars: number;

    @ApiProperty({
        description: "время истечения энергии",
        default: 32423423
    })
    @Prop({ type: Number })
    timestamp_recovery: number;

    @ApiProperty({
        description: "время истечения энергии"
    })
    @Prop({ type: MongooseSchema.Types.Mixed })
    loot_boxes: any;

    @ApiProperty({
        description: "ids завершеннх заданий",
        default: ["123", "343"]
    })
    @Prop()
    quest_completed: string[];

    @ApiProperty({
        description: "время последних действий игрока",
        default: 234324234
    })
    @Prop({ type: Number })
    timestamp: number;

    @ApiProperty({
        description: "не выданная награда",
        default: []
    })
    @Prop({ type: [{ type: Types.ObjectId }], ref: 'Item' })
    items: Item[];

}

export const UserSchema = SchemaFactory.createForClass(User);



