import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Delete,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user); //Access and Refresh Token to be Used on Frontend
  }

  //@Delete('logout')
  //async logout(@)

  //Example of an authguard
  //@UseGuards(JwtAuthGuard)
  //@Get('profile')
  //getProfile(@Request() req) {
  //return req.user;
  //}
}
