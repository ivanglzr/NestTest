import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async postUser(user: CreateUserDto) {
    const newUser = new this.userModel(user);

    await newUser.save();
  }

  async putUser(id: string, user: UpdateUserDto): Promise<UpdateUserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) throw new NotFoundException('Not found');

    return deletedUser;
  }
}
