import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashSync } from 'bcryptjs';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    users.map((user) => delete user.password);

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);

    delete user.password;

    return user;
  }

  async updateOne(
    id: number,
    { name, email, password }: CreateUserDto,
  ): Promise<User> {
    await this.userRepository.findOneOrFail(id);
    const newPassword = hashSync(password, 8);

    await this.userRepository.update(
      { id },
      { name, email, password: newPassword },
    );

    const newUser = await this.userRepository.findOne(id);

    delete newUser.password;

    return newUser;
  }

  async insertOne({ name, email, password }: CreateUserDto): Promise<User> {
    const newPassword = hashSync(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: newPassword,
    });

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async deleteOne(id: number): Promise<void> {
    await this.userRepository.findOneOrFail(id);
    this.userRepository.delete(id);
  }
}
