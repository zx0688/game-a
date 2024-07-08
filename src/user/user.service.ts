import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';
import { WebAppInitDataDto, WebAppUserDto } from '../auth/dto/authorize-user-dto';
import { UserDto } from 'src/telegram/dto/telegram-api-dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async getByUid(uid: string): Promise<UserDocument | null> {
        try {
            return await this.userModel.findOne({ uid }).exec();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async getByUidOrCreate(userDto: WebAppUserDto): Promise<User> {
        try {
            const uid = userDto.id.toString();
            let user: User = await this.userModel.findOne({ uid }).exec();
            if (!user) {
                user = await this.createAndSaveUser(userDto);
            }
            return user;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async createLeaderBoard(): Promise<any> {

        const total = await this.userModel
            .find({})
            .sort({ "coins.coins_total": -1 })
            .limit(10)
            .select("username uid _id photo_url coins")
            .lean()
            .exec();
        const week = await this.userModel
            .find({})
            .sort({ "coins.coins_week": -1 })
            .limit(10)
            .select("username uid _id photo_url coins")
            .lean()
            .exec()

        return {
            total: total.map(user => ({
                username: user.username,
                uid: user.uid,
                _id: user._id,
                photo_url: user.photo_url,
                coins: user.coins
            })),
            week: week.map(user => ({
                username: user.username,
                uid: user.uid,
                _id: user._id,
                photo_url: user.photo_url,
                coins: user.coins
            }))
        };
    }

    async findUsersByIds(uids: string[]): Promise<UserDocument[]> {
        return await this.userModel.find({ uid: { $in: uids } }).limit(100).exec();
    }
    async getFriends(uids: string[], timestamp_week: number): Promise<any[]> {
        const friends = await this.findUsersByIds(uids);
        friends.forEach(f => {
            if (f.timestamp && f.timestamp >= timestamp_week)
                f.coins.coins_week = 0;
        });
        return friends.map(f => ({
            [f.uid]: f.coins
        }));
    }

    public getTimestampNextWeek(): number {
        const now = new Date();
        const startOfNextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        return startOfNextWeek.getTime();
    }


    private async createAndSaveUser(user: WebAppUserDto): Promise<UserDocument> {
        try {
            const newUser = new this.userModel(new UserCreateDto(user));
            newUser.timestamp = Date.now();
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


}
