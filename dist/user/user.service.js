"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const user_create_dto_1 = require("./dto/user-create.dto");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getByUid(uid) {
        try {
            return await this.userModel.findOne({ uid }).exec();
        }
        catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
    async getByUidOrCreate(userDto) {
        try {
            const uid = userDto.id.toString();
            let user = await this.userModel.findOne({ uid }).exec();
            if (!user) {
                user = await this.createAndSaveUser(userDto);
            }
            return user;
        }
        catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
    async createLeaderBoard() {
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
            .exec();
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
    async findUsersByIds(uids) {
        return await this.userModel.find({ uid: { $in: uids } }).limit(100).exec();
    }
    async getFriends(uids, timestamp_week) {
        const friends = await this.findUsersByIds(uids);
        friends.forEach(f => {
            if (f.timestamp && f.timestamp >= timestamp_week)
                f.coins.coins_week = 0;
        });
        return friends.map(f => ({
            [f.uid]: f.coins
        }));
    }
    getTimestampNextWeek() {
        const now = new Date();
        const startOfNextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        return startOfNextWeek.getTime();
    }
    async createAndSaveUser(user) {
        try {
            const newUser = new this.userModel(new user_create_dto_1.UserCreateDto(user));
            newUser.timestamp = Date.now();
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map