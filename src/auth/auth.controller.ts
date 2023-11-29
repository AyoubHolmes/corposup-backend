import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google/googleOAuth.guard';
import { User } from '../user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { LocalAuthGuard } from './guards/local/local.guard ';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import { SignInDocs, SignOutDocs, SignUpDocs } from './auth.swagger';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/user/dtos/user.dto';

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
  // @UseInterceptors(FilesInterceptor('avatar'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'companyLogo', maxCount: 1 },
    ]),
  )
  async signUp(
    @Body() authCredentialsDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
    @UploadedFiles()
    files: {
      avatar: Express.Multer.File[];
      companyLogo: Express.Multer.File[];
    },
  ) {
    return await this.authService.signUp(
      authCredentialsDto,
      res,
      files.avatar[0],
      files.companyLogo[0],
    );
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
