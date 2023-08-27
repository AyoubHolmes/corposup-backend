import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { signUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google/googleOAuth.guard';
import { User } from '../user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { LocalAuthGuard } from './guards/local/local.guard ';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import { SignInDocs, SignOutDocs, SignUpDocs } from './auth.swagger';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleOauthGuard)
  async googleLogin(
    @User() user: IUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.logIn(user, res);
  }

  @SignUpDocs()
  @Post('signUp')
  @UseInterceptors(FileInterceptor('avatar'))
  async signUp(
    @Body() authCredentialsDto: signUpDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signUp(authCredentialsDto, res, avatar);
  }

  @SignInDocs()
  @Post('logIn')
  @UseGuards(LocalAuthGuard)
  async logIn(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logIn(user, res);
  }

  @SignOutDocs()
  @Get('signOut')
  @UseGuards(JwtAuthGuard)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signOut(req, res);
  }
}
