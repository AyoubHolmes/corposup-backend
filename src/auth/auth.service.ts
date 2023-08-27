import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { signUpDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './auth.interface';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { GcpService } from 'src/gcp/gcp.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
    private gcpService: GcpService,
  ) {}

  async signUp(
    signupDto: signUpDto,
    res: Response,
    avatar?: Express.Multer.File,
  ) {
    try {
      if (avatar) {
        const avatarUrl = await this.gcpService.uploadFile(avatar);
        signupDto.avatar = avatarUrl;
      }
      const newUser = await this.userService.signUp(signupDto);
      const payloadUser: IUser = {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        role: newUser.role,
      };
      await this.logIn(payloadUser, res);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async logIn(user: IUser, res: Response) {
    const accessToken: string = this.jwtService.sign(user);
    res.cookie('jwt', accessToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') !== 'development',
      sameSite: true,
    });
  }

  async signOut(req: Request, res: Response) {
    try {
      const token: string | null = req.cookies?.jwt;
      if (token) {
        const payload: JwtAuthPayload = this.jwtService.decode(
          token,
        ) as JwtAuthPayload;
        await this.redisService.set(
          token,
          JSON.stringify(payload),
          'EX',
          payload.exp - payload.iat,
        );
      }
      res.clearCookie('jwt', { httpOnly: true });
      res.status(HttpStatus.NO_CONTENT);
    } catch (err) {
      throw err;
    }
  }
}
