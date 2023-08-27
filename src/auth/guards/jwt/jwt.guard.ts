import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private redisService: RedisService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);

      const req: Request = context.switchToHttp().getRequest();

      const token: string | null = req.cookies?.jwt;

      const payload: string | null = await this.redisService.get(token);

      if (payload) throw new UnauthorizedException();

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
