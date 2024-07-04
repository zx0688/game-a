import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Coins {
    @Prop()
    coins_total: number;

    @Prop()
    coins_per_week: number;
}

@Schema()
export class Reward {
    @Prop()
    coins: number;

    @Prop()
    stars: string;
}

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    uid: string;

    @Prop({ type: Coins })
    coins: Coins;

    @Prop({ type: Number })
    level: number;

    @Prop({ type: Number })
    stars: number;

    @Prop({ type: Number })
    timestamp_recovery: number;

    @Prop({ type: MongooseSchema.Types.Mixed })
    loot_boxes: any;

    @Prop({ type: [{ type: Types.ObjectId }], ref: 'Reward' })
    reward: Reward[];

}

export const UserSchema = SchemaFactory.createForClass(User);

