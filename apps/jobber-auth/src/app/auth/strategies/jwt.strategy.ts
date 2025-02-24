import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.Authorization,
        (req: any) => req.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload) {
    return payload;
  }
}
