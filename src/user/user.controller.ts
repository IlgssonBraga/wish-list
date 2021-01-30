import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.userService.insertOne(createUserDto);

    return user;
  }
}
