import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(fullName, username, pass) {
    const user = await this.usersService.create(fullName, username, pass);
    const payload = {
      fullName: user.fullName,
      username: user.username,
      id: user.id,
    };
    return {
      payload,
    };
    // return 'test';
  }
  // async test() {
  //   return 'test';
  // }
}
