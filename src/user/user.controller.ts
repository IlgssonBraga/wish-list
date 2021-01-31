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
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.insertOne(createUserDto);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateOne(id, createUserDto);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.deleteOne(id);
  }
}
