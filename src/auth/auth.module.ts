import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthStrategy } from './guards/google/googleOAuth.strategy';
import { JwtAuthStrategy } from './guards/jwt/jwt.strategy';
import { LocalStrategy } from './guards/local/local.strategy';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpService } from 'src/gcp/gcp.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleOauthStrategy,
    LocalStrategy,
    JwtAuthStrategy,
    GcpService,
  ],
  imports: [
    GcpModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
