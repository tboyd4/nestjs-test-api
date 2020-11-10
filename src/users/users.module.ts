import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
  ],
  providers: [UsersService]
})
export class UsersModule {}
