import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';
import { WebAppInitDataDto, WebAppUserDto } from '../auth/dto/authorize-user-dto';
import { LeaderBoardDto, UserLeaderDto } from './dto/user-response.dto';

@Injectable()
export class UserService {

    public static LeaderBoard: LeaderBoardDto = null;

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    private timeStampNextWeek: number = null;

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
                user = await this.createUser(userDto);
            }
            return user;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async createLeaderBoard(): Promise<LeaderBoardDto> {
        let total_ids, week_ids, top_total, top_week;
        try {
            const total = await this.userModel
                .find({})
                .sort({ "coins.coins_total": -1 })
                .select("user.id")
                .lean()
                .exec();

            total_ids = total.map(user => user.user.id.toString());
            top_total = await this.userModel
                .find({ "user.id": { $in: total_ids } })
                .select("user coins")
                .lean()
                .exec();

            const week = await this.userModel
                .find({})
                .sort({ "coins.coins_week": -1 })
                .select("user.id")
                .lean()
                .exec();

            week_ids = week.map(user => user.user.id.toString());
            top_week = await this.userModel
                .find({ "user.id": { $in: week_ids } })
                .select("user coins")
                .lean()
                .exec();

        }
        catch (error) {
            throw new HttpException(`Error sorting users ${error}`, HttpStatus.NOT_FOUND);
        }
        const board = new LeaderBoardDto({
            top_total: top_total.map(u => new UserLeaderDto({ user: u.user, coins: u.coins })),
            total: total_ids,
            week: week_ids,
            top_week: top_week.map(u => new UserLeaderDto({ user: u.user, coins: u.coins }))
        });

        return board;
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
        if (!this.timeStampNextWeek)
            this.createTimestampNextWeek();
        return this.timeStampNextWeek;
    }

    public createTimestampNextWeek(): number {
        const now = new Date();
        const startOfNextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        this.timeStampNextWeek = startOfNextWeek.getTime();
        return this.timeStampNextWeek;
    }


    private async createUser(user: WebAppUserDto): Promise<UserDocument> {
        try {
            const createdUser = await this.userModel.create(new UserCreateDto(user));
            return createdUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


}
