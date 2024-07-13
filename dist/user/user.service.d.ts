import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { WebAppUserDto } from '../auth/dto/authorize-user-dto';
import { LeaderBoardDto } from './dto/user-response.dto';
export declare class UserService {
    private userModel;
    static LeaderBoardCacheInstance: LeaderBoardDto;
    constructor(userModel: Model<UserDocument>);
    private timeStampNextWeek;
    getByUid(uid: string): Promise<UserDocument | null>;
    getByUidOrCreate(userDto: WebAppUserDto): Promise<User>;
    createLeaderBoard(): Promise<LeaderBoardDto>;
    findUsersByIds(uids: string[]): Promise<UserDocument[]>;
    getFriends(uids: string[], timestamp_week: number): Promise<any[]>;
    getTimestampNextWeek(): number;
    createTimestampNextWeek(): number;
    private createUser;
}
