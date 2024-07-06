import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types, Document, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Coins {
    @Prop({ type: Number })
    coins_total: number;
    @Prop({ type: Number })
    coins_per_week: number;
}

@Schema()
export class Reward {
    @Prop()
    id: string;
    @Prop({ type: Number })
    coins: number;
    @Prop({ type: Number })
    level: number;
    @Prop({ type: String })
    stars: string;
    constructor() {
        this.id = new mongoose.Types.ObjectId().toString();
    }
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

    @Prop()
    quest_completed: string[];

    @Prop({ type: Number })
    timestamp: number;

    @Prop({ type: [{ type: Types.ObjectId }], ref: 'Reward' })
    reward: Reward[];

}

export const UserSchema = SchemaFactory.createForClass(User);

