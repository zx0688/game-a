import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { GameDataInstance } from 'src/user/dto/game-data.dto';
import { Coins, Reward, User, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

export enum ActionCommand {
    COLLECT = 'collect',
    QUEST = 'quest',
    ACCEPT = 'accept'
}

@Injectable()
export class ActionService {

    constructor(private userService: UserService) { }


    async applyCommand(user: UserDocument, command: string, value: string): Promise<any> {

        user.timestamp = Date.now();

        switch (command) {
            case ActionCommand.COLLECT:
                var intValue: number = parseInt(value);

                if (intValue != 1)
                    throw new HttpException("Error: value should be 1", HttpStatus.EXPECTATION_FAILED);

                this.addCoins(user, intValue);

                await user.save();
                return user.coins;

            case ActionCommand.ACCEPT:
                var reward = user.reward.find(r => r.id === value);
                if (!reward)
                    throw new HttpException(`Error: reward ${value} does not exists`, HttpStatus.EXPECTATION_FAILED);

                if (reward.coins) {
                    this.addCoins(user, reward.coins);
                }
                if (reward.level) {
                    user.level += reward.level;
                }

                user.reward = user.reward.filter(r => r !== reward);
                await user.save();
                return user.reward;

            case ActionCommand.QUEST:

                if (!(value in GameDataInstance.quests))
                    throw new HttpException(`Error: quest ${value} is undefined`, HttpStatus.EXPECTATION_FAILED);
                if (user.quest_completed.includes(value))
                    throw new HttpException(`Error: quest ${value} already completed`, HttpStatus.EXPECTATION_FAILED);

                user.quest_completed.push(value);
                var reward = new Reward();
                reward.coins = GameDataInstance.quests[value];
                user.reward.push(reward);
                await user.save();
                return user.reward;

            default:
                throw new Error(`Error: undefined action command ${command}`);
        }
    }

    async createItemPayment(user: UserDocument, value: any): Promise<Reward> {
        var reward = new Reward();
        reward.coins += value;
        user.reward.push(reward);
        await user.save();
        return reward;
    }

    private addCoins(user: UserDocument, value: number): any {

        user.coins.coins_total += value;

        if (user.timestamp >= this.userService.getTimestampNextWeek())
            user.coins.coins_per_week = 0;

        user.coins.coins_per_week += value;
    }


}
