import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from './authDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: LoginUserDto) {
    // return 'test';
    return this.authService.signUp(
      signUpDto.fullName,
      signUpDto.username,
      signUpDto.password,
    );
  }

  // @Public()
  // @Post('test')
  // test() {
  //   return this.authService.test();
  // }

  // @Post('register')
  // signUp(@Param('username') username: string, @Param('pass') pass: string) {
  //   return this.authService.signUp(username, pass);
  // }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
