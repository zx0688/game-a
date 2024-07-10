import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { WebAppUserDto } from '../auth/dto/authorize-user-dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private timeStampNextWeek;
    getByUid(uid: string): Promise<UserDocument | null>;
    getByUidOrCreate(userDto: WebAppUserDto): Promise<User>;
    createLeaderBoard(): Promise<any>;
    findUsersByIds(uids: string[]): Promise<UserDocument[]>;
    getFriends(uids: string[], timestamp_week: number): Promise<any[]>;
    getTimestampNextWeek(): number;
    createTimestampNextWeek(): number;
    private createUser;
}
