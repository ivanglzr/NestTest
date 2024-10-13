import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AppService } from './app.service';

import { CreateUserDto } from './dto/user.dto';
import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.appService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.appService.getUser(id);

    if (!user) throw new NotFoundException("User doesn't exist");

    return user;
  }

  @Post()
  @HttpCode(201)
  async postUser(@Body() user: CreateUserDto) {
    await this.appService.postUser(user);

    return {
      statusCode: 201,
      message: 'Created',
    };
  }

  @Put(':id')
  async putUser(@Param('id') id: string, @Body() user: Partial<CreateUserDto>) {
    await this.appService.putUser(id, user);

    return {
      statusCode: 200,
      message: 'Updated',
    };
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
