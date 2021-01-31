import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.service';


@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.insertOne(createUserDto);

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateOne(id, createUserDto);

    return user;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.deleteOne(id);
  }
}
