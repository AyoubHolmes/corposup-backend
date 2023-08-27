import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IUser } from 'src/user/interfaces/user.interface';
import { JwtAuthPayload } from 'src/auth/auth.interface';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    protected readonly configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtAuthStrategy.extractJwt]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtAuthPayload) {
    const getUser: User = await this.userService.findOneById(payload.id);
    if (!getUser) throw new NotFoundException('User not found');

    const user: IUser = {
      id: getUser.id,
      firstname: getUser.firstname,
      lastname: getUser.lastname,
      role: getUser.role,
    };
    return user;
  }

  private static extractJwt(req: Request) {
    if (req.cookies?.jwt && req.cookies.jwt.length) {
      return req.cookies.jwt;
    }
    return null;
  }
}
