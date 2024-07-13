import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, SaveOptions } from 'mongoose';
import { GameDataInstance } from 'src/user/dto/game-data.dto';
import { Coins, Item, User, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

export enum ActionCommand {
    COLLECT = 'collect',
    QUEST = 'quest',
    ACCEPT = 'accept'
}

@Injectable()
export class ActionService {

    constructor(private userService: UserService,
        @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async collect(user: UserDocument, value: string): Promise<Coins> {
        const intValue = parseInt(value);
        this.addCoins(user, intValue);
        await this.userModel.updateOne({ uid: user.uid }, { coins: user.coins })
        return user.coins;
    }

    async accept(user: UserDocument, value: string): Promise<Item[]> {
        var reward = user.items.find(r => r.id === value);
        if (!reward)
            throw new HttpException(`Error: reward ${value} does not exists`, HttpStatus.EXPECTATION_FAILED);
        if (reward.coins)
            this.addCoins(user, reward.coins);
        if (reward.level)
            user.level += reward.level;
        user.items = user.items.filter(r => r !== reward);
        await this.userModel.updateOne({ uid: user.uid }, { items: user.items })
        return user.items;
    }

    async quest(user: UserDocument, value: string): Promise<Item[]> {
        if (!(value in GameDataInstance.quests))
            throw new HttpException(`Error: quest ${value} is undefined`, HttpStatus.EXPECTATION_FAILED);
        if (user.quest_completed.includes(value))
            throw new HttpException(`Error: quest ${value} already completed`, HttpStatus.EXPECTATION_FAILED);

        user.quest_completed.push(value);
        var reward = new Item(GameDataInstance.quests[value]);
        user.items.push(reward);
        await this.userModel.updateOne({ uid: user.uid }, { quest_completed: user.quest_completed, items: user.items })
        return user.items;
    }

    private addCoins(user: UserDocument, value: number): any {

        user.coins.coins_total += value;

        if (user.timestamp >= this.userService.getTimestampNextWeek())
            user.coins.coins_week = 0;
        user.coins.coins_week += value;
    }


}
