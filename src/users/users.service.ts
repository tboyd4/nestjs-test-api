import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async insertUser(user: User): Promise<string> {
        const newUser = new this.userModel({
            email: user.email,
            password: user.password,
        });
        const result = await newUser.save();
        console.log(result);
        return result.id;
    }
}
