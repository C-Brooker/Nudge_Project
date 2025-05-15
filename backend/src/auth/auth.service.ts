import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  async login(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_JWT_SECRET;

    if (!user) {
      throw new Error('User Authentication Failed');
    }
    try {
      const payload = { username: user.username, sub: user.id };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: secret,
        expiresIn: '15m',
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '7d',
      });

      await this.storeRefreshToken(user.id, refreshToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error('Token Generation Failed');
    }
  }

  async storeRefreshToken(userId: number, token: string): Promise<void> {
    const user = await this.usersService.findOneByID(userId);

    const hashedToken = await bcrypt.hash(token, 10);

    const refreshToken = this.refreshTokenRepository.create({
      user,
      hashedToken,
    });

    await this.refreshTokenRepository.save(refreshToken);
  }

  async logout(userId: number): Promise<void> {
    const user = await this.usersService.findOneByID(userId);
    await this.refreshTokenRepository.delete({ user: user });
  }
}
