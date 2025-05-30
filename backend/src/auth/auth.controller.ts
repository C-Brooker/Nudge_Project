import { Controller, Post, UseGuards, Request, Delete } from '@nestjs/common';

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

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Request() req: any) {
    const userId = req.user.id;
    return this.authService.logout(userId);
  }
}
