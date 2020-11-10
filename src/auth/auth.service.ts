import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async register(newUser: User): Promise<any> {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        try {
            let createdUser = newUser;
            createdUser.password = hashedPassword;
            const result = await this.usersService.insertUser(createdUser);
            return result;
        } catch (error) {
            throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
        }
    }
}
