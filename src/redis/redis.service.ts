import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(private configService: ConfigService) {
    super(+configService.get('REDIS_PORT'), configService.get('REDIS_HOST'), {
      password: configService.get('REDIS_PASSWORD'),
    });
  }
}
