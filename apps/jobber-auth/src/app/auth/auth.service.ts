import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { compare } from 'bcryptjs';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput, res: Response) {
    const user = await this.authenticated(loginInput);

    const expiredAt = new Date();

    expiredAt.setMilliseconds(
      expiredAt.getMilliseconds() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRES_IN')),
    );

    const secret = await this.configService.getOrThrow('JWT_SECRET');
    const token = this.jwtService.sign({ userId: user.id }, { secret });

    res.cookie('Authorization', token, {
      expires: expiredAt,
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
    });

    return user;
  }

  private async authenticated({ password, email }: LoginInput) {
    try {
      const user = await this.userService.getUser({ email });

      const isAuthenticated = await compare(password, user.password);

      if (!isAuthenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
