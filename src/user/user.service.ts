import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async getByUid(uid: string): Promise<User | null> {
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

    async getLeaderBoard(uids: string[]): Promise<any[]> {
        const friends = await Promise.all(uids.map(async id => {
            const friend = await this.getByUid(id);
            return friend;
        }));
        return friends
            .filter(friend => friend !== null)
            .sort((a, b) => b.coins.coins_total - a.coins.coins_total)
            .slice(0, 10)
            .map(f => ({
                uid: f.uid,
                data: f.coins
            }));
    }

    public getTimestampNextWeek(): number {
        const now = new Date();
        const startOfNextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        return Math.floor(startOfNextWeek.getTime() / 1000);
    }

    public authorization(req: Request) {
        try {
            const token = req.headers['authorization'];

            return;

            if (!token) {
                throw new UnauthorizedException('Token is missing');
            }

            const isValid = true;
            if (!isValid) {
                throw new UnauthorizedException('Invalid token');
            }
        } catch (error) {
            throw new UnauthorizedException('Unauthorized', error.message);
        }
    }

    private async createAndSaveUser(uid: string): Promise<User> {
        try {
            const newUser = new this.userModel(new UserCreateDto({ uid }));
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


}
