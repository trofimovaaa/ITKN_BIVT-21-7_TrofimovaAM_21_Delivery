import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    if (!username) throw new HttpException('Не все поля заполнены', 400);
    return this.userRepository.findOne({ where: { username } });
  }
  async create(
    fullName: string,
    username: string,
    password: string,
  ): Promise<User> {
    if (!fullName || !username || !password)
      throw new HttpException('Не все поля заполнены', 400);
    if (await this.userRepository.findOne({ where: { username } }))
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        400,
      );
    const user = new User();
    user.fullName = fullName;
    user.username = username;
    user.password = password;
    await this.userRepository.save(user);
    return this.userRepository.findOne({ where: { username } });
  }
}
