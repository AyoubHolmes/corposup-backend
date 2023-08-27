import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<IUser> {
    try {
      const userValid = await this.userService.validateUser(email, password);
      const user: IUser = {
        id: userValid.id,
        firstname: userValid.firstname,
        lastname: userValid.lastname,
        role: userValid.role,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
}
