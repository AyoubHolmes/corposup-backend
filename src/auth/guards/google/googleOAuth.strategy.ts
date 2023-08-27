import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { registerGoogleDto } from '../../auth.dto';
import { Role, User } from 'src/user/entities/user.entity';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    try {
      let getUser: User = await this.userService.findOneByEmail(
        emails[0].value,
      );
      if (!getUser) {
        const newUser: registerGoogleDto = {
          firstname: name.givenName,
          lastname: name.familyName,
          email: emails[0].value,
          avatar: photos[0].value,
          role: Role.USER,
        };
        getUser = await this.userService.signUp(newUser);
      }
      const user: IUser = {
        id: getUser.id,
        firstname: getUser.firstname,
        lastname: getUser.lastname,
        role: getUser.role,
      };
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
