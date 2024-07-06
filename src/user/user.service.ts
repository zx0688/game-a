import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';
import { WebAppInitDataDto } from '../auth/dto/authorize-user-dto';

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

    async getByUidOrCreate(uid: string): Promise<User> {
        try {
            let user: User = await this.userModel.findOne({ uid }).exec();
            if (!user) {
                user = await this.createAndSaveUser(uid);
            }
            return user;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findUsersByIds(uids: string[]): Promise<UserDocument[]> {
        return await this.userModel.find({ uid: { $in: uids } }).limit(100).exec();
    }
    async getFriends(uids: string[], timestamp_week: number): Promise<any[]> {
        const friends = await this.findUsersByIds(uids);
        friends.forEach(f => {
            if (f.timestamp && f.timestamp >= timestamp_week)
                f.coins.coins_per_week = 0;
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

    // public async updateUser(user: UserDocument) {
    //     return await this.userModel
    //         .findByIdAndUpdate(user._id, user)
    //         .select("coins")
    //         .exec();
    // }

    private async createAndSaveUser(uid: string): Promise<UserDocument> {
        try {
            const newUser = new this.userModel(new UserCreateDto({ uid }));
            newUser.timestamp = Date.now();
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


}
